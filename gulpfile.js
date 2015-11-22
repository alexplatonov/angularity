'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');


gulp.task('default', ['build-dev']);
gulp.task('deploy', ['build-prod']);
