# Youtuberis.lt

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-deployed-F38020?logo=cloudflare&logoColor=white)](https://www.youtuberis.lt)

A personal **website** and a blog where I will share my knowledge about YouTube, how to make a channel, optimize videos, earning money, various frequently asked questions, tips, games monetization and music databases and related etc. I will strive to publish at least once a week. However, no guarantees given.

This is also kinda a playground to polish my coding skills, try out and adopt Web 2.0 technologies, new APIs and other lovely stuff out there.

The topic inspired after 3+ years long contribution to Lithuania's largest business forum `uzdarbis.lt` thread _Profit from YouTube FAQ_ (literal translation).

## Technologies

- **[Hugo](https://github.com/gohugoio/hugo)**, a static-site generator. The foundation.
- **[Bulma](https://github.com/jgthms/bulma)** + [Buefy](https://github.com/buefy/buefy). Front-end design and functions.
- **[VueJS](https://github.com/vuejs/vue)** + **VanillaJS**. Interactivity and progressive enhancements.
- **Service Worker**. Speed, web requests, offline support.
- **[Bun](https://bun.sh)**. Package manager and the asset bundler (see `build.ts`).
- **[Cloudflare Pages](https://pages.cloudflare.com)**. Atomic deployment and hosting.
- **GitHub**. Version control, code hosting.

## Requirements & Install

- [Bun](https://bun.sh) (handles dependencies and the asset build).
- [Hugo extended](https://github.com/gohugoio/hugo) — pinned to `0.128.0` for deploys (see notes below).

Run `bun install` to pull in the dependencies.

## Asset build (`build.ts`)

`build.ts` replaces the old Laravel Mix / webpack pipeline. It uses Bun's native
bundler plus `sass` and `favicons`, and outputs everything Hugo needs into `static/`:

- `src/js/script.js` → `static/scripts.js` (Vue 2 SFCs compiled via an inline plugin)
- `src/js/serviceworker.js` → `static/sw.js`
- `src/scss/app.scss` → `static/styles.css`, `src/scss/mini.scss` → `static/loader.css`
- `src/images/logo.svg` → `static/icons/*` (favicons, production builds only)
- `src/images/*`, `src/manifest.json`, `src/_headers` copied through to `static/`

| Command | What it does |
| --- | --- |
| `bun run build` | Development asset build (skips favicons for speed) |
| `bun run watch` | Same as `build`, rebuilding on changes under `src/` |
| `bun run prod` | Production asset build (minified, includes favicons) |
| `bun run deploy` | `bun run prod` then `hugo --cleanDestinationDir` → outputs to `docs/` |

## Development

1. `bun install` to install dependencies.
2. `bun run watch` to watch and compile assets.
3. In another terminal, `bun run hugo` to serve the site (or `bun run hugo-p` to
   disable Hugo live reload).

### Asset URLs in templates

Assets are emitted with fixed names, so reference them through the `_mix` partial,
which resolves the name to an absolute URL. The path must begin **without a slash**:

```html
<!-- Good -->
<link rel="stylesheet" type="text/css" href="{{ partial "_mix" "styles.css" }}">
<!-- Bad -->
<link rel="stylesheet" type="text/css" href="{{ partial "_mix" "/styles.css" }}">
```

### Service worker cache busting

`build.ts` injects a cache version into `static/sw.js` (`process.env.SW_VERSION`):
the Cloudflare commit SHA on deploys, a timestamp for local production builds.
Every deploy therefore gets a fresh version, and the worker's `cleanCaches()`
drops the old caches on activate.

### Environment variables

Variables for the asset build go in a `.env` file and **must be prefixed** with
`MIX_` (kept for backwards compatibility), e.g. `MIX_DISQUS_PUBLIC_KEY`. They are
inlined into the bundle at build time and read via `process.env.MIX_…`.

### Branding / favicons

The [`favicons`](https://github.com/itgalaxy/favicons) package takes
`src/images/logo.svg` and generates the icon set into `static/icons/`. This only
runs on production builds (`bun run prod`); the dev scripts pass `--no-favicons`.

### SVG compression

[SVGO](https://github.com/svg/svgo) is used to compress and minify SVGs. Run
`svgo -f . --multipass --disable={collapseGroups,cleanupIDs}` in the folder
containing the SVGs (`--disable=…` preserves clip-paths when multiple SVGs share a page).

### Icons

Icons are integrated via [Icomoon](https://icomoon.io/app/). Pick the desired
icons and download them. From the zip: `./fonts/*` goes into `./src/fonts/`, and
`style.css` is copied to `./src/scss/icons.scss`. To work with Buefy's integrated
icons, replace strings matching `icon-` with `fa-` (Buefy supports only FA and MDI).

## Deployment (Cloudflare Pages)

Connect the repo to a Cloudflare Pages project with:

| Setting | Value |
| --- | --- |
| Build command | `bun run cf:build` |
| Build output directory | `docs` |
| Environment variable | `HUGO_VERSION = 0.128.0` |

`bun run cf:build` runs `cf-build.sh`, which installs dependencies, builds the
assets and runs Hugo. Production (the `master` branch) keeps the canonical domain
from `config.toml`; preview/branch deploys override the baseURL with Cloudflare's
`$CF_PAGES_URL` so their links resolve on the `*.pages.dev` domain.

Security/caching headers live in `src/_headers`, which the build copies to
`static/_headers` and Hugo emits to `docs/_headers` for Cloudflare to apply.

> **Hugo version:** the templates still use a few APIs (`.Site.DisqusShortname`,
> `.Site.LanguageCode`) that are deprecated and removed in Hugo ≥ 0.140, so the
> deploy is pinned to `0.128.0`. Modernize those calls before bumping `HUGO_VERSION`.

### Local deployment test

Build and serve `./docs` with any static server:

```sh
bun run deploy --baseURL="/"   # passes the flag through to hugo
```

Then serve the `./docs` directory, or use ngrok for online testing with SSL.

## Online testing with ngrok

Run `bun run serve`, then `bun run hugo-l {ngrok tunnel URL here}` and browse to
the ngrok tunnel URL.

## Content management

1. `hugo new [post|page|duk]/[name-of-the-content-file].md`
2. Write a great article or make the desired edits.
3. Double check and `git commit -m "Content | [Page|Post|DUK] | [New|Edit|Remove] - The title"`
4. `git push`.

## Copyright & licence

Developed by Lukas Vanagas. Code implementation copyright. Licensed under
[the BSD 3-Clause](LICENSE.md).
