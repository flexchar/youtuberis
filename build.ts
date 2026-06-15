/**
 * Build script — replaces laravel-mix/webpack
 * Run:  bun run build.ts [--watch] [--no-favicons]
 * Env:  NODE_ENV=production bun run build.ts
 */

import { rm, mkdir, cp, copyFile } from "fs/promises";
import { existsSync, watch } from "fs";
import path from "path";

const isProd = Bun.env.NODE_ENV === "production";
const isWatch = process.argv.includes("--watch");
const skipFavicons = process.argv.includes("--no-favicons");

// ── Vue 2 SFC plugin ─────────────────────────────────────────────────────────
// Compiles .vue single-file components so Bun.build() can bundle them.
// Uses new Function() for render code to avoid strict-mode 'with' restrictions.
const vue2Plugin = {
  name: "vue2-sfc",
  setup(build: any) {
    // Buefy's source imports .vue files without the extension (e.g. import Dropdown from './Dropdown').
    // Teach Bun to resolve those by trying the .vue extension when nothing else matches.
    build.onResolve(
      { filter: /^\.{1,2}\//, namespace: "file" },
      ({ path: importPath, resolveDir }: { path: string; resolveDir: string }) => {
        if (path.extname(importPath)) return null; // already has an extension
        const vuePath = path.join(resolveDir, importPath + ".vue");
        if (existsSync(vuePath)) return { path: vuePath };
        return null;
      }
    );

    build.onLoad({ filter: /\.vue$/ }, async ({ path: filePath }: { path: string }) => {
      const vueCompiler = require("vue-template-compiler") as typeof import("vue-template-compiler");
      const source = await Bun.file(filePath).text();
      const sfc = vueCompiler.parseComponent(source);

      const templateContent = sfc.template?.content ?? "";
      const scriptContent = sfc.script?.content ?? "export default {}";

      let renderCode = "";
      if (templateContent) {
        const compiled = vueCompiler.compile(templateContent);
        for (const err of compiled.errors ?? []) {
          console.warn(`[vue] ${filePath}:`, err);
        }
        const staticFns = (compiled.staticRenderFns ?? [])
          .map((fn: string) => `new Function(${JSON.stringify(fn)})`)
          .join(",");
        renderCode = `
__component__.render = new Function(${JSON.stringify(compiled.render)});
__component__.staticRenderFns = [${staticFns}];
`;
      }

      // "export default {}" → "var __component__ = {}" so we can attach render
      const processedScript = scriptContent.replace(
        /\bexport\s+default\s+/,
        "var __component__ = "
      );

      return {
        contents: `${processedScript}\n${renderCode}\nexport default __component__;\n`,
        loader: "js" as const,
      };
    });
  },
};

// ── Build steps ──────────────────────────────────────────────────────────────

async function buildJS() {
  const result = await Bun.build({
    entrypoints: ["src/js/script.js"],
    outdir: "static",
    naming: "scripts.js",
    target: "browser",
    format: "iife",
    minify: isProd,
    plugins: [vue2Plugin],
    define: {
      "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "development"),
      "process.env.MIX_DISQUS_PUBLIC_KEY": JSON.stringify(
        Bun.env.MIX_DISQUS_PUBLIC_KEY ?? ""
      ),
    },
  });
  if (!result.success) {
    for (const log of result.logs) console.error("[js]", log);
    throw new Error("JS build failed");
  }
}

async function buildSW() {
  if (isProd) {
    const result = await Bun.build({
      entrypoints: ["src/js/serviceworker.js"],
      outdir: "static",
      naming: "sw.js",
      target: "browser",
      format: "iife",
      minify: true,
    });
    if (!result.success) {
      for (const log of result.logs) console.error("[sw]", log);
      throw new Error("SW build failed");
    }
  } else {
    await copyFile("src/js/serviceworker.js", "static/sw.js");
  }
}

async function buildCSS() {
  const { compile } = await import("sass");
  const entries = [
    ["src/scss/app.scss", "static/styles.css"],
    ["src/scss/mini.scss", "static/loader.css"],
  ] as const;
  for (const [input, output] of entries) {
    const result = compile(input, {
      style: isProd ? "compressed" : "expanded",
      // allows @import "node_modules/..." paths in the SCSS files
      loadPaths: ["."],
      // Bulma/Buefy 0.6 use legacy Sass syntax — silence the noise until deps are updated
      silenceDeprecations: ["import", "global-builtin", "color-functions", "slash-div", "if-function"] as any,
    });
    await Bun.write(output, result.css);
  }
}

async function buildFavicons() {
  if (skipFavicons) return;
  const { default: favicons } = await import("favicons");
  const response = await favicons("src/images/logo.svg", {
    path: "/icons/",
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      favicons: true,
      windows: true,
      yandex: false,
    },
  });
  await mkdir("static/icons", { recursive: true });
  for (const image of response.images) {
    await Bun.write(`static/icons/${image.name}`, image.contents);
  }
  for (const file of response.files) {
    await Bun.write(`static/icons/${file.name}`, file.contents);
  }
}

async function copyAssets() {
  await copyFile("src/_headers", "static/_headers");
  await copyFile("src/manifest.json", "static/manifest.json");
  await mkdir("static/img", { recursive: true });
  await cp("src/images", "static/img", { recursive: true });
  // Hugo's _mix.html partial reads this to resolve asset URLs
  await Bun.write(
    "static/mix-manifest.json",
    JSON.stringify(
      { "/styles.css": "/styles.css", "/loader.css": "/loader.css", "/scripts.js": "/scripts.js", "/sw.js": "/sw.js" },
      null,
      2
    )
  );
}

// ── Orchestration ─────────────────────────────────────────────────────────────

let faviconsDone = false;

async function runBuild() {
  const t = Date.now();
  try {
    const tasks: Promise<void>[] = [buildJS(), buildSW(), buildCSS(), copyAssets()];
    if (!faviconsDone) tasks.push(buildFavicons());
    await Promise.all(tasks);
    faviconsDone = true;
    const label = isProd ? "production" : "development";
    console.log(`✓ built in ${Date.now() - t}ms (${label})`);
  } catch (err) {
    console.error("✗ build failed:", err);
    if (!isWatch) process.exit(1);
  }
}

// Clean and initial build
await rm("static", { recursive: true, force: true });
await mkdir("static", { recursive: true });
await runBuild();

if (isWatch) {
  console.log("watching src/ for changes…");
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  watch("src", { recursive: true }, (_, filename) => {
    if (!filename) return;
    process.stdout.write(`  changed: ${filename}\n`);
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => runBuild(), 150);
  });
}
