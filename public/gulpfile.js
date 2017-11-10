// Gulp Config
let gulp = require('gulp'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    less = require('gulp-less'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    moment = require('moment'),
    header = require('gulp-header'),
    folders = {
        src: 'src/',
        build: 'build/'
    }
;

const gulpStylelint = require('gulp-stylelint');
const package = require('./package.json');



//image processing
gulp.task('images', function () {
    var out = folders.build + '_images/';
    return gulp.src(folders.src + '_images/**/*')
        .pipe(newer(out))
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(out))
});

// CSS processing
gulp.task('css', function() {
    const postCssOpts = [
        autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
        mqpacker
    ];

    postCssOpts.push(cssnano);

    return gulp.src(folders.src + '_less/styles.less')
        .pipe(less({ style: 'compressed' }))
        .pipe(postcss(postCssOpts))
        .pipe(gulp.dest(folders.build + 'css/'));
});

// Create style.css with theme header
gulp.task('theme', function () {
    const timestamp = moment().unix();
    const banner = {
        full : '/* Used in my CSS and JS files */',
        min : '/* Used in my minified CSS and JS files */',
        theme :
            `/**n
             * Theme Name: ${ package.name} v${ timestamp } 
             * Description: ${ package.description }
             * Version: ${ timestamp }
             * Author: ${ package.author.name }
             * Author URI: ${ package.author.url }
             * License: ${ package.license }
             * License URI: ${ package.author.url }/mit/n
             */`
    };
    return gulp.src('./style.css')
        .pipe(header(banner.theme, { package : package }))
        .pipe(gulp.dest('../'));
});

gulp.task('watch', function () {
    gulp.watch(folders.src + '_less/**/*', ['css', 'theme']);
    gulp.watch(folders.src + '_images/**/*', ['images']);
});

gulp.task('lint-css', function lintCssTask() {
    return gulp
        .src(folders.src + '_less/**/*.less')
        .pipe(gulpStylelint({
            failAfterError: true,
            reportOutputDir: 'reports/lint',
            reporters: [
                {formatter: 'verbose', console: true},
                {formatter: 'json', save: 'report.json'},
            ],
            debug: true
        }));
});

gulp.task('run', ['css', 'images', 'theme']);

gulp.task('default', ['run', 'watch']);