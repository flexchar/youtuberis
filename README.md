# Youtuberis.lt

A personal **website** and a blog where I will share my knowledge about YouTube, how to make a channel, optimize videos, earning money, various frequently asked questions, tips, games monetization and music databases and related etc. I will strive to publish at least once a week. However, no guarantees given.

This is also kinda a playground to polish my coding skills, try out and adopt Web 2.0 technologies, new APIs and other lovely stuff out there.

The topic inspired after 3+ years long contribution to Lithuania's largest business forum `uzdarbis.lt` thread _Profit from YouTube FAQ_ (literal translation). 

## Technologies

- **[Hugo](https://github.com/gohugoio/hugo)**, a static-site generator. The foundation.
- **[Bulma](https://github.com/jgthms/bulma)** + [Buefy](https://github.com/buefy/buefy). Front-end design and functions.
- **[VueJS](https://github.com/vuejs/vue)** + **VanillaJS**. Interactivity and progressive enhancements.
- **Service Worker**. Speed, web requests, offline support.
- **[Laravel Mix](https://github.com/JeffreyWay/laravel-mix)**, webpack. Hassle-free asset optimization.
- **[Yarn](https://github.com/yarnpkg/yarn)**. Fast dependencies management.
- **Netlify**. Atomic deployment and hosting.
- **GitHub**. Version control, code hosting.

## Requirements & Install

* Hugo 0.37 or above.
* Yarn.

> I use Windows Linux Substitute, hence instructions primarily optimized for Linux environments.

#### For development:
1. Run `yarn` to install dependencies. 
2. Run 'yarn run watch' to watch and compile assets.
3. Run `yarn run hugo` to watch and serve the site.

> **TIP**: Append commands with `&` to run in the background. Or use `Ctrl + Z` to pause and then `bg` to resume in background. For instance, `yarn run watch &` will automatically execute in the background.


#### For content: 
1. Run `hugo new [post|page|duk]/[name-of-the-content-file].md`
2. Write a great article.
3. Double check and commit with -m as `Content | [Page|Post|DUK] | [New|Edit|Remove] - The title`
4. Git Push.

## Copyright & Licence

Developed by Lukas Vanagas (@flexeye). Code implementations lincesed under [the BSD 3-Clause](LICENSE.md).