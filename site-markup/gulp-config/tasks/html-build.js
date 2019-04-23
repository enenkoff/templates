module.exports = function (gulp, plugins, path_src, path_dest) {

    return gulp.src(path_src)
            .pipe(plugins.htmlTagInclude())
            .pipe(gulp.dest(path_dest))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(plugins.notify( 'Готово!' ));
};