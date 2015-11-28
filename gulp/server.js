'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  browserSyncSpa = require('browser-sync-spa');


function browserSyncInit() {

  browserSync.init({
    port: 3210,
    server: './dist'
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['build-dev'], function() {
  browserSyncInit();
});

gulp.task('serve:dist', ['build-prod'], function() {
  browserSyncInit();
});

