#  Maderas - A WordPress starter theme

![Super Sweet Logo](screenshot.png)

"A great forking theme" comes set up to use Timber, Gulp, Webpack, Babel, and Less. This theme currently does not have any default styling so that you have a completely blank slate to start with! 

Go forth and build!

## Why build another starter theme?
The thought process behind this theme is trying to take an already great starter theme and implement modern build processes, and dependency management using the best tools currently available.

## What's here?

`static/` is where you can keep your static front-end files. In other words, your images, fonts, and SVGs could live here.

`public/` is the frontend of your site it contains `src/` and `build/` where (respectively) your raw and compiled LESS and JS files live.

`templates/` contains all of your Twig templates. These pretty much correspond 1 to 1 with the PHP files that respond to the WordPress template hierarchy. At the end of each PHP template, you'll notice a `Timber::render()` function whose first parameter is the Twig file where that data (or `$context`) will be used. Just an FYI.

`bin/` and `tests/` ... basically don't worry about (or remove) these unless you know what they are and want to.

## Installing the Theme

Install this theme as you would any other, and be sure the Timber plugin is activated. But hey, let's break it down into some bullets:

1. Download the zip for this theme (or clone) and move it to `wp-content/themes` in your WordPress installation. 
2. Rename the folder to something that makes sense for your website (generally no spaces and all lowercase). You could keep the name `lumber-starter-theme` but the point of a starter theme is to make it your own!
3. Update `package.json` with the correct `name` and `description` (this will automatically be added to the `style.css` for the theme).
4. **Go through the *BUILD PROCESS* detailed below before moving on** 
4. Install the Timber Plugin:
    1. Method 1: install as you would a normal plugin
    2. Method 2 (preferred): 
        1. Ensure that `composer` is installed (install [here](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx))
        2. from the theme root directory run `composer install` 
5. Activate the theme in Appearance >  Themes.
6. Do your thing! And read [the docs](https://github.com/jarednova/timber/wiki).

## Building the Frontend

The frontend uses Less and ES6, with Gulp to run tasks, and Webpack to bundle up the JS.
there are a lot of neat things you can do here, feel free to modify and open a PR if you think your gulp tasks or Webpack config can help others.

**YOU WILL NEED TO ENSURE THAT NODE AND YARN ARE INSTALLED BEFORE MOVING ON**

**NODE**
`brew install node`

**YARN**
`brew install yarn`

1. Navigate to `/public/` and run `yarn install` this will install all of the required node modules for building the frontend (this requires having the latest version of  node installed)
2. from the `/public/` directory  

    * **FOR LESS && SCSS** run `yarn build` this will generate the CSS, and bundle up the JS and put them in their respective folders under `/public/build/`

    * **FOR SCSS ONLY** run `yarn webp` this will generate the CSS, and bundle up the JS and put them in their respective folders under `/public/build/`

**NOTE**

require('bootstrap') will load all of Bootstrap’s jQuery plugins onto the jQuery object. The bootstrap module itself does not export anything. You can manually load Bootstrap’s jQuery plugins individually by loading the /js/*.js files under the package’s top-level directory.

## TODO
- [ ] Feel Free to make suggestions, and ask questions!

## Other Resources

* [ES6 goodies](https://ponyfoo.com/articles/es6)
* [The Timber docs](https://github.com/jarednova/timber/wiki).
* [Twig for Timber Cheatsheet](http://notlaura.com/the-twig-for-timber-cheatsheet/)
* [Timber and Twig Reignited My Love for WordPress](https://css-tricks.com/timber-and-twig-reignited-my-love-for-wordpress/) on CSS-Tricks
* [A real live Timber theme](https://github.com/laras126/yuling-theme).
* [Timber Video Tutorials](http://timber.github.io/timber/#video-tutorials) and [an incomplete set of screencasts](https://www.youtube.com/playlist?list=PLuIlodXmVQ6pkqWyR6mtQ5gQZ6BrnuFx-) for building a Timber theme from scratch.

