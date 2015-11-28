'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  path = require('path'),
  npmLibraries = require('../package.json').dependencies,
  folders = {
    src: 'src',
    core: 'core',
    views: 'views',
    scripts: 'scripts',
    lib: 'libraries',
    test: 'test',
    mocks: 'mocks',
    components: 'components'
  };

gulp.task('test', function() {


  var libPaths = [];

  for (var lib in npmLibraries) {
    libPaths = libPaths.concat(path.join('node_modules', lib, lib + '.js'));
  }

  libPaths = libPaths.concat(path.join(folders.src, folders.lib, '**/*.js'));


  var testFiles = [
    path.join('node_modules', 'angular-mocks', 'angular-mocks.js'),
    path.join(folders.src, folders.components, '**', folders.lib, '**/*.js'),
    path.join(folders.src, folders.core, folders.scripts, '**/*.js'),
    path.join(folders.src, folders.views, '**', folders.scripts, '**/*.js'),
    path.join(folders.src, folders.components, '**', folders.scripts, '**/*.js'),
    path.join(folders.src, folders.core, folders.test, '*.js'),
    path.join(folders.src, folders.views, '**', folders.test, '**/*.js'),
    path.join(folders.src, folders.components, '**', folders.test, '**/*.js')
  ];

  testFiles = libPaths.concat(testFiles);

  console.log(testFiles);

  return gulp.src(testFiles)
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));

});

