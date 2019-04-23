module.exports = function (gulp, plugins, path_src, path_dest) {

    let autoprefixer = require('autoprefixer'),
        mqpacker = require('css-mqpacker'),
        stylefmt = require('stylefmt');

    let onError = function(err) {
        plugins.notify.onError({
            title: "Error in " + err.plugin,
            message: err.message
        })(err);
        this.emit('end');
    };

    return gulp.src(path_src)
            .pipe(plugins.plumber({ errorHandler: onError }))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass())
            .pipe(
                plugins.postcss([
                    autoprefixer({
                        browsers:['last 10 versions']
                    }),
                    mqpacker(),
                    stylefmt(STYLEFMT)
                ])
            )
            .pipe(plugins.cleanCss())
            .pipe(plugins.sourcemaps.write())
            .pipe(plugins.rename({suffix: '.min'}))
            .pipe(gulp.dest(path_dest))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(plugins.notify( 'Готово!' ) );
};