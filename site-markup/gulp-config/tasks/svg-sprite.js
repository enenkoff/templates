module.exports = function (gulp, plugins, path_src, path_dest) {

    return gulp.src(path_src)
               .pipe(plugins.svgstore())
               .pipe(gulp.dest(path_dest));
};