module.exports = function(gulp, plugins, path_src, path_dest, condition) {
    return gulp
        .src(path_src)
        .pipe(plugins.if(condition, plugins.newer(path_dest)))
        .pipe(
            plugins.imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
            }),
        )
        .pipe(gulp.dest(path_dest))
        .pipe(plugins.webp())
        .pipe(gulp.dest(path_dest));
};
