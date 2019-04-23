module.exports = function (gulp, plugins, path_src, path_dest) {

    let webpack = require('webpack'),
        webpackStream = require('webpack-stream');

    return gulp.src(path_src + 'app.js')
            .pipe(webpackStream({
                output: {
                    filename: 'app.js',
                },
                module: {
                    rules: [
                        {
                            test: /\.(js)$/,
                            exclude: /(node_modules)/,
                            loader: 'babel-loader',
                            query: {
                                presets: ['env']
                            }
                        }
                    ]
                },
                externals: {
                    jquery: 'jQuery'
                }
            }))
            .pipe(plugins.uglify())
            .pipe(plugins.rename({ suffix: '.min' }))
            .pipe(gulp.dest(path_dest))
};