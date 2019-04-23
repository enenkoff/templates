module.exports = function (gulp, plugins, path_src, path_dest) {

    return gulp.watch(
             path_src,
             gulp.series(path_dest)
           );
};