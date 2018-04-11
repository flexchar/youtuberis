let mix = require('laravel-mix');

// Image Management 
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin');

// Clean Destination
const Clean = require('clean-webpack-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 */

// Returns boolean, true if webpack hot module reload is active
// let isHOT = () => process.env.HOT ? true : false;
// let isDEV = () => process.env.NODE_ENV !== 'production';

// Parse assets
mix.webpackConfig({
    plugins: [
        // Clean destination folder
        new Clean('static', {
            verbose: true,
            // These will be taken care by the webpack itself
            exclude: ['hot', 'mix-manifest.json','manifest.json'],
            // For testing
            dry: !mix.inProduction(),
            // Clean before other events
            beforeEmit: true
        }),
        // Generate favicons
        // also generates a lot of unwanted content, 
        // currently I manually have generated head links in partial "_branding.html"
        // To be improved
        new FaviconsWebpackPlugin({
            persistentCache: true,
            logo: './src/images/logo.svg',
            prefix: 'icons/',
            // background: '#f5f5f5',
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                favicons: true,
                firefox: true,
                windows: true
            }
        }),
        // Assets
        new CopyWebpackPlugin([{
            from: 'src/images',
            to: 'img'
        }]),
        // Compress images
		new ImageminPlugin({
            disable: !mix.inProduction(),
            test: /\.(jpe?g|png|gif|svg)$/i,
            plugins: [
                imageminMozjpeg({
                    quality: 60,
                }),
                imageminPngquant({
                    quality: '60-80'
                }),
                imageminSvgo()
            ]
        })
    ]
});

// Browser Sync | Uncomment if wanted
// mix.browserSync({
//     // Listen to Hugo server,| yarn run hugo-p
//     proxy: 'localhost:1313',
//     // Define NIC IP address to bind to
//     // host: '',
//     // Sync Code changes across clients
//     codeSync: true,
//     // Open tab in browser, false as WSL doesn't support this
//     open: false,
// });

// Process JS and SASS
mix.js('src/js/script.js', 'scripts.js')
    .js('src/js/serviceworker.js', 'sw.js')
    .sass('src/scss/app.scss', 'styles.css')
	.sass('src/scss/mini.scss', 'loader.css');

// Copy Manifest
mix.copy('src/manifest.json', 'static/manifest.json');

// Set dest path
mix.setPublicPath('static');

// Generate source maps for Chrome debugger
// if (!mix.inProduction()) {
//     mix.webpackConfig({
//         devtool: 'source-map'
//     })
//     .sourceMaps()
// }

mix.options({
  processCssUrls: false
});


// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.ts(src, output); <-- Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
