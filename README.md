# Youtuberis.lt

A personal **website** and a blog where I will share my knowledge about YouTube, how to make a channel, optimize videos, earning money, various frequently asked questions, tips, games monetization and music databases and related etc. I will strive to publish at least once a week. However, no guarantees given.

This is also kinda a playground to polish my coding skills, try out and adopt Web 2.0 technologies, new APIs and other lovely stuff out there.

The topic inspired after 3+ years long contribution to Lithuania's largest business forum `uzdarbis.lt` thread _Profit from YouTube FAQ_ (literal translation).

## Technologies

- **[Hugo](https://github.com/gohugoio/hugo)**, a static-site generator. The foundation.
- **[Bulma](https://github.com/jgthms/bulma)** + [Buefy](https://github.com/buefy/buefy). Front-end design and functions.
- **[VueJS](https://github.com/vuejs/vue)** + **VanillaJS**. Interactivity and progressive enhancements.
- **Service Worker**. Speed, web requests, offline support.
- **[Laravel Mix](https://github.com/JeffreyWay/laravel-mix)**, webpack. Hassle-free asset optimization. Deeply integrated to support version hashing, hot module replacement.
- **[Yarn](https://github.com/yarnpkg/yarn)**. Fast dependencies management.
- **Netlify**. Atomic deployment and hosting.
- **GitHub**. Version control, code hosting.

## Requirements & Install

- Hugo 0.37.1 or above.
- Yarn (npm should also work). It will install needed dependencies.

> **NOTES:** I **use Windows Linux Substitute**, hence instructions primarily optimized for Linux environments. To access page on remote devices you may need to configure firewall exceptions. BrowserSync can also be helpful, enable by uncommenting it in `webpack.mix.js`

## Development

1. Run `yarn` to install dependencies.
2. Run `yarn run watch` to watch and compile assets. OR `yarn run hot` to enable [Hot Module Replacement](https://github.com/JeffreyWay/laravel-mix/blob/master/docs/hot-module-replacement.md). If running `hot` the first time, it's a good idea to `yarn run dev` to populate other assets such as images/uploads.
3. Run `yarn run hugo` to watch and serve the site. OR `yarn run hugo-p` to disable Hugo live reload on file changes.

> **TIP**: Append commands with `&` to run in the background. Or use `Ctrl + Z` to pause and then `bg` to resume in the background. For instance, `yarn run watch &` will automatically execute in the background. So you can run multiple commands within same terminal instance.

Note that webpack favicon generator may throw a console error `node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs: error while loading shared libraries: libfontconfig.so.1: cannot open shared object file: No such file or directory`. A fix that worked for me was to `apt install libfontconfig`.

### Laravel Mix function

Alternative to Laravel Mix [versioning function](https://laravel.com/docs/5.6/mix#versioning-and-cache-busting): `mix('js/bundle.js')` in Hugo is to use `{{ partial "_mix" "js/bundle.js" }}` (ugly but at least works). Please note that path has to begin **without a slash**. See example below.

``` html
<!-- Good -->
<link rel="stylesheet" type="text/css" href="{{ partial "_mix" "styles.css" }}">
<!-- Bad -->
<link rel="stylesheet" type="text/css" href="{{ partial "_mix" "/styles.css" }}">
```

### Environment Variables

Environment variables can be defined in .env file and **must be prefixed** with `MIX_EXAMPLE`. The variables then are accessible on `process.env.MIX_EXAMPLE` **during** WebPack compiliation. [Source](https://laravel.com/docs/5.6/mix#environment-variables).

### Branding

The [`favicons-webpack-plugin`](https://github.com/jantimon/favicons-webpack-plugin) takes `logo.svg` in and spits out the truck of icons. It also outputs manifest, cache and other files that are not being used. This workflow is definitely a subject for a further optimization and improvement. Thou at least branding is displayed more less nicely. It is expected that plugin author will soon release the new API that should allow for a conditional optimized workflow to take place.

### SVG Compression

[SVGO](https://github.com/svg/svgo) tool is used to compress and minify svgs. Execute `svgo -f . --multipass --disable={collapseGroups,cleanupIDs}` in folder containing svgs. `--disable={collapseGroups,cleanupIDs}` to preserve clip-paths when multiple SVGs used in web page.

### Icons

Icons are being integrated with [Icomoon](https://icomoon.io/app/). The list of desired icons is made and then downloaded. The contents of downloaded .zip: `./fonts/*` goes into `./src/fonts/` directory, `style.css` is copied to `./src/scss/icons.scss` file. In order to work with Buefy integrated icons, strings that match `icon-` has to be replaced with `fa-`. Buefy currently does not support other icon packs than FA and MDI.

## Local deployment testing

To test deploy locally before pushing you may `yarn run deploy --baseURL="/"` and then serve from `./docs` directory by using any web server of choice ([Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en) is a good example). Or use ngrok for online testing with SSL support.

## Online testing with ngrok

For live testing `yarn run serve`, then `yarn run hugo-l {replace with ngrok tunnel URL here}`. Browse to ngrok tunnel URL.

## Content Management

1. Run `hugo new [post|page|duk]/[name-of-the-content-file].md`
2. Write a great article or make desired edits.
3. Double check and `git commit` with `-m` as `Content | [Page|Post|DUK] | [New|Edit|Remove] - The title`
4. Git Push.

## Copyright & Licence

Developed by Lukas Vanagas. Code implementation copyright. Licensed under [the BSD 3-Clause](LICENSE.md).