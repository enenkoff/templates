/* gulp variables */

var gulp = require('gulp'),
    notify = require('gulp-notify'),
    svgstore = require('gulp-svgstore'),
    injectSvg = require('gulp-inject-svg'),
    imagemin = require('gulp-imagemin'),
    include = require('gulp-html-tag-include'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    cssmin = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    newer = require('gulp-newer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');


/* postcss variables */

var postcss = require('gulp-postcss'),
    autoprefix = require('autoprefixer'),
    stylefmt = require('stylefmt'),
    configFmt = require('./stylefmt.config'),
    mqpacker = require('css-mqpacker');


/* paths */

var path = {
    build: {
        html: 'dev/build/',                                 /* path to ready htmls */
        js: 'dev/build/assets/js/',                         /* path to ready js */
        css: 'dev/build/assets/css/',                       /* path to ready css */
        img: 'dev/build/assets/images/',                    /* path to ready images */
        media: 'dev/build/assets/media/',                   /* path to ready media-files */
        svg: 'dev/build/assets/svg/',                       /* path to ready svg */
        fonts: 'dev/build/assets/fonts/'                    /* path to ready fonts */
    },
    src: {
        common: 'dev/src/',                                 /* path to source folder */
        svg: 'dev/src/svg/',                                /* path to source svg folder */
        media: 'dev/src/media/**/*.*',                      /* path to source media files */
        fonts: 'dev/src/fonts/**/*.*',                      /* path to source fonts folder */
        js: 'dev/src/js/',                                  /* path to source js folder */
        html_templates: 'dev/src/_code/templates/',         /* path to source html all files */
        html_pages: 'dev/src/_code/pages/*.html',           /* path to source html page-files */
        sass: 'dev/src/sass/**/*.+(sass|scss)',             /* path to source sass files */
        img: 'dev/src/images/**/*.+(jpg|jpeg|png|gif)'      /* path to source images files */
    },
    watch: {
        html: 'dev/src/_code/**/*.html',                    /* path for watch html files */
        js: 'dev/src/js/**/*.js',                           /* path for watch js files */
        style: 'dev/src/sass/**/*.scss'                     /* path for watch sass files */
    },
    clean: 'dev/build'                                      /* path for browsersync directory */
};


/* browser sync */

gulp.task('browser-sync',function () {
    browserSync({
        server: path.clean,
        host: 'localhost',
        browser: 'chrome',
        port: 5000,
        notify: false
    })
});


/* create svg sprite */

gulp.task('svg-sprite', function(){
    gulp.src(path.src.svg + 'sprite/*.svg')
        .pipe(newer(path.build.svg))
        .pipe(svgstore())
        .pipe(gulp.dest(path.src.svg))
        .pipe(gulp.dest(path.build.svg));

    gulp.src([path.src.svg + '**/*.svg','!' + path.src.svg + 'sprite.svg'])
        .pipe(newer(path.build.svg))
        .pipe(gulp.dest(path.build.svg));
});


gulp.task('svg', ['svg-sprite'], function(){

    gulp.src(path.src.svg + 'sprite-svg.html')
        .pipe(injectSvg({
            base: path.src.svg
        }))
        .pipe(gulp.dest(path.src.html_templates));

});

/* minimize images */

gulp.task('img', function () {
    gulp.src(path.src.img)
        .pipe(newer(path.build.img))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.reload({stream: true}));
});

/* media */

gulp.task('media', function(){
    gulp.src(path.src.media)
        .pipe(gulp.dest(path.build.media))
});

/* fonts */

gulp.task('fonts', function(){
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


/* builders */

gulp.task('builder:html', function () {
    gulp.src(path.src.html_pages)
        .pipe(include())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('builder:js', function () {
    gulp.src(path.src.js + 'main.js')
        .pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('builder:css', function () {
    gulp.src(path.src.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sass().on('error', notify.onError(
            {
                message: "<%= error.message %>",
                title  : "Sass ошибка!"
            }))
        )
        .pipe(
            postcss([
                autoprefix({
                    browsers:['last 10 versions']
                }),
                mqpacker(),
                stylefmt(configFmt)
            ])
        )
        .pipe(gulp.dest(path.build.css))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(notify( 'Готово!' ) )
        .pipe(browserSync.reload({stream: true}));
});



/* watch changes */

gulp.task('watch', ['svg', 'builder:css', 'builder:html', 'builder:js', 'browser-sync'], function () {
    gulp.watch(path.watch.style,['builder:css']);
    gulp.watch(path.watch.html, ['builder:html']);
    gulp.watch(path.watch.js, ['builder:js']);
});

/* dafault tasks */

gulp.task('default',function () {
    gulp.run('watch');
});
