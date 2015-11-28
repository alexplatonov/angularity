'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  path = require('path'),
  folders = {
    src: 'src',
    dest: 'dist',
    components: 'components',
    i18n: 'i18n'
  };

gulp.task('watch' ,function () {

  var styleWatcher = gulp.watch(path.join(folders.src, '**/*.scss'), ['styles']),
    scriptWatcher = gulp.watch(path.join(folders.src, '**/*.js'), ['scripts', 'test']),
    templateWatcher = gulp.watch(path.join(folders.src, folders.components, '**/*.html'), ['scripts']),
    imageWatcher = gulp.watch(path.join(folders.src, '**', '**/*.{png,jpg,jpeg,gif,svg}'), ['images']),
    i18nWatcher = gulp.watch(path.join(folders.src, '**', folders.i18n, '**/*.json'), ['i18n']),
    htmlWatcher = gulp.watch(path.join(folders.src, '*.html'), ['html'])


  styleWatcher.on('ready', function () {
    console.log('Watching styles..');
  }).on('change', function (event) {
    console.log(event.type.toUpperCase() + ': [style] ' + event.path);
  });

  scriptWatcher.on('ready', function () {
    console.log('Watching scripts..');
  }).on('change', function (event) {
    console.log(event.type.toUpperCase() + ': [script] ' + event.path);
  });

  templateWatcher.on('ready', function () {
    console.log('Watching component templates..');
  }).on('change', function (event) {
    console.log(event.type.toUpperCase() + ': [template] ' + event.path);
  });

  imageWatcher.on('ready', function () {
    console.log('Watching images..');
  }).on('change', function (event) {
    console.log(event.type.toUpperCase() + ': [image] ' + event.path);
  });

  i18nWatcher.on('ready', function () {
    console.log('Watching i18n..');
  }).on('change', function (event) {
    console.log(event.type.toUpperCase() + ': [i18n] ' + event.path);
  });

  htmlWatcher.on('ready', function () {
    console.log('Watching html..');
  }).on('change', function (event) {
    console.log(event.type.toUpperCase() + ': [html] ' + event.path);
  });

  gulp.watch(path.join(folders.dest, '**/*.*'), function(event) {
    console.log('Reloading BrowserSync')
    browserSync.reload(event.path);
  });

});

