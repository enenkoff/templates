module.exports = function(gulp, plugins) {
    function getTask(task, path_src, path_dest, condition) {
        return require('./tasks/' + task)(gulp, plugins, path_src, path_dest);
    }

    /* browser sync ------------------------------------- */

    gulp.task('browser:sync', () => {
        return getTask('browser-sync', PATH_CONFIG.browser, PATH_CONFIG.port);
    });

    /* clean all files ------------------------------------- */

    gulp.task('files:clean', () => {
        return getTask('clean', PATH_CONFIG.clean);
    });

    /* svg:compile --------------------------------------*/

    // svg sprite build

    gulp.task('svg:sprite', () => {
        return getTask('svg-sprite', PATH_CONFIG.src.svg_sprite, PATH_CONFIG.src.svg);
    });

    // svg copy all files to build

    gulp.task('svg:copy', () => {
        return getTask('copy', PATH_CONFIG.src.svg_files, PATH_CONFIG.build.svg);
    });

    // svg inject to html template

    gulp.task(
        'svg:inject',
        gulp.series('svg:sprite', () => {
            return getTask('svg-inject', PATH_CONFIG.src.svg, PATH_CONFIG.src.html_templates);
        }),
    );

    // svg build sprite and copy all files to build

    gulp.task(
        'svg:build',
        gulp.series('svg:inject', 'svg:copy', done => {
            done();
        }),
    );

    // svg build and html build

    gulp.task(
        'svg:build-to-html',
        gulp.series('svg:inject', 'svg:copy', () => {
            return getTask('html-build', PATH_CONFIG.src.html_pages, PATH_CONFIG.build.html);
        }),
    );

    /* img:compile --------------------------------------*/

    gulp.task('img:optimize', () => {
        return getTask('img-optimize', PATH_CONFIG.src.img, PATH_CONFIG.build.img, true);
    });
    gulp.task('img:optimize-force', () => {
        return getTask('img-optimize', PATH_CONFIG.src.img, PATH_CONFIG.build.img);
    });

    /* media:copy --------------------------------------*/

    gulp.task('media:copy', () => {
        return getTask('copy', PATH_CONFIG.src.media, PATH_CONFIG.build.media);
    });

    /* fonts:copy --------------------------------------*/

    gulp.task('fonts:copy', () => {
        return getTask('copy', PATH_CONFIG.src.fonts, PATH_CONFIG.build.fonts);
    });

    /* css:compile ------------------------------------- */

    gulp.task('css:build', () => {
        return getTask('css-build', PATH_CONFIG.src.sass, PATH_CONFIG.build.css);
    });

    /* html:compile ------------------------------------- */

    gulp.task(
        'html:build',
        gulp.series('svg:inject', () => {
            return getTask('html-build', PATH_CONFIG.src.html_pages, PATH_CONFIG.build.html);
        }),
    );

    /* js:compile ------------------------------------- */

    // build app src file

    gulp.task('js:rigger', () => {
        return getTask('js-rigger', PATH_CONFIG.src.js_partials, PATH_CONFIG.src.js);
    });

    gulp.task('webpack', () => {
        return getTask('webpack', PATH_CONFIG.src.js, PATH_CONFIG.build.js);
    });

    // svg build sprite and copy all files to build

    gulp.task(
        'js:build',
        gulp.series('js:rigger', 'webpack', done => {
            done();
        }),
    );

    /* watchers --------------------------------------*/

    gulp.task(
        'watch:css',
        gulp.parallel('css:build', () => {
            return getTask('watch', PATH_CONFIG.watch.style, 'css:build');
        }),
    );

    gulp.task(
        'watch:html',
        gulp.parallel('html:build', 'browser:sync', () => {
            return getTask(
                'watch',
                [PATH_CONFIG.watch.html, PATH_CONFIG.watch.html_no_svg],
                'html:build',
            );
        }),
    );

    gulp.task(
        'watch:js',
        gulp.parallel('js:build', 'browser:sync', () => {
            return getTask(
                'watch',
                [PATH_CONFIG.watch.js, PATH_CONFIG.watch.js_no_app],
                'js:build',
            );
        }),
    );

    gulp.task(
        'watch:img',
        gulp.parallel('img:optimize', 'browser:sync', () => {
            return getTask('watch', PATH_CONFIG.watch.img, 'img:optimize');
        }),
    );

    gulp.task(
        'watch:svg',
        gulp.parallel('svg:build', 'browser:sync', () => {
            return getTask('watch', [PATH_CONFIG.watch.svg, PATH_CONFIG.watch.svg_no_sprite], 'svg:build');
        }),
    );

    gulp.task(
        'watch',
        gulp.series(
            'files:clean',
            gulp.parallel(
                'css:build',
                'svg:copy',
                'html:build',
                'js:build',
                'img:optimize',
                'browser:sync',
                () => {
                    getTask('watch', PATH_CONFIG.watch.style, 'css:build');
                    getTask(
                        'watch',
                        [PATH_CONFIG.watch.html, PATH_CONFIG.watch.html_no_svg],
                        'html:build',
                    );
                    getTask(
                        'watch',
                        [PATH_CONFIG.watch.js, PATH_CONFIG.watch.js_no_app],
                        'js:build',
                    );
                    getTask('watch', PATH_CONFIG.watch.img, 'img:optimize');
                    getTask('watch', [PATH_CONFIG.watch.svg, PATH_CONFIG.watch.svg_no_sprite], 'svg:build-to-html');
                },
            ),
        ),
    );

    /* server build --------------------------------------*/

    gulp.task(
        'build',
        gulp.parallel(
            'css:build',
            'js:build',
            'img:optimize',
            'svg:build',
            'media:copy',
            'fonts:copy',
            done => {
                done();
            },
        ),
    );

    /* gulp default --------------------------------------*/

    gulp.task('default', gulp.series('watch'), done => {
        done();
    });
};
