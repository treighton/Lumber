// Gulp Config

var
    //gulp modules
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    less = require('gulp-less'),
    postcss = require('gulp-postcss'),
    assets = require('postcss-assets'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps')

    folders = {

        src: 'src/',
        build: 'build/'

    }
;

//image processing
gulp.task('images', function () {
    var out = folders.build + 'images/';
    return gulp.src(folders.src + '_images/**/*')
        .pipe(newer(out))
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(out))
});

// CSS processing
gulp.task('css', function() {
    var postCssOpts = [
        autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
        mqpacker
    ];

    postCssOpts.push(cssnano);

    return gulp.src(folders.src + '_less/style.less')
        .pipe(less({ style: 'compressed' }))
        .pipe(postcss(postCssOpts))
        .pipe(gulp.dest(folders.build + 'css/'));

});


gulp.task('watch', function () {
    gulp.watch(folders.src + '_less/**/*', ['css']);
    gulp.watch(folders.src + '_images/**/*', ['images']);
});

gulp.task('run', ['css', 'images']);

gulp.task('default', ['run', 'watch']);