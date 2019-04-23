const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Globally expose config objects
global.PATH_CONFIG = require('./gulp-config/path-config');
global.STYLEFMT = require('./stylefmt.config');

global.browserSync = require('browser-sync');

// Require all tasks configuration
require('./gulp-config/tasks-config')(gulp, plugins);
