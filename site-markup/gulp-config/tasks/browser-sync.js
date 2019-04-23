module.exports = function (gulp, plugins, path_src, path_dest) {

    return browserSync.init({
        server: path_src,
        host: 'localhost',
        browser: 'chrome',
        port: path_dest,
        notify: false
    });
};