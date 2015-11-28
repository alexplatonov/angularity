'use strict';

var env = 'development',
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*']
    }),
    path = require('path'),
    del = require('del'),
    config = require('../config.json'),
    npmLibraries = require('../package.json').dependencies,
    languages = config.i18n,
    folders = {
        src: 'src',
        dest: 'dist',
        core: 'core',
        views: 'views',
        components: 'components',
        temp: 'temp',
        styles: 'styles',
        scripts: 'scripts',
        images: 'images',
        i18n: 'i18n',
        lib: 'libraries'
    },
    onError = function (err) {
        console.log(err);
    };


// ------------------------------------ //
// -------------- STYLES -------------- //
// ------------------------------------ //

gulp.task('styles', function() {
    var stylePaths = [
        path.join(folders.src, folders.core, folders.styles, '**/*.scss'),
        path.join(folders.src, folders.views, '**', folders.styles, '**/*.scss'),
        path.join(folders.src, folders.components, '**', folders.styles, '**/*.scss')
    ];

    return gulp.src(stylePaths)
        .pipe($.plumber({errorHandler: onError}))

        .pipe($.newer(path.join(folders.dest, folders.styles, 'style.css')))

        .pipe($.if(env === 'development', $.sourcemaps.init()))
        .pipe($.if(env === 'development', $.sass({style: 'expanded'})))
        .pipe($.if(env === 'production', $.sass()))
        .pipe($.autoprefixer('last 3 version', '> 3%', 'ie 8', 'Safari >= 5'))
        .pipe($.concat('style.css'))
        .pipe($.if(env === 'development', $.sourcemaps.write()))

        .pipe($.if(env === 'production', $.csso()))
        .pipe(gulp.dest(path.join(folders.dest, folders.styles)))

        .pipe($.if(env === 'development', $.livereload()))
        .pipe($.size({title: 'CSS'}))
        .pipe($.plumber.stop());

});


// ------------------------------------ //
// ------------- SCRIPTS -------------- //
// ------------------------------------ //

gulp.task('scripts', function() {
    var scriptPaths = [
            path.join(folders.src, folders.core, folders.scripts, '**/*.js'),
            path.join(folders.src, folders.views, '**', folders.scripts, '**/*.js'),
            path.join(folders.src, folders.components, '**', folders.scripts, '**/*.js'),
            path.join(folders.src, folders.views, '**/*.html'),
            path.join(folders.src, folders.components, '**/*.html')
        ],
        htmlFilter = $.filter('**/*.html');

    return gulp.src(scriptPaths)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.newer(path.join(folders.dest, folders.scripts, 'app.js')))

        // .pipe($.debug())
        .pipe(htmlFilter)
        .pipe($.angularTemplates({
            module: 'angularity'
        }))
        .pipe(htmlFilter.restore())


        .pipe($.if(env === 'production', $.stripCode({
            start_comment: 'dev-code',
            end_comment: 'end-dev-code'
        })))
        .pipe($.if(env === 'production', $.stripCode({
            pattern: / *(\/\/)? *?console\.log\('?.*'?\);/g
        })))

        // auto-insert nginject for babel/ES6 ng-annotation issues for injection
        .pipe($.replace(/(\.(config|run)\()/g, '$1 /*@ngInject*/ '))
        .pipe($.replace(/(\.(controller|directive|factory|filter)\(\'\w*\',)/g, '$1 /*@ngInject*/'))
        .pipe($.ngAnnotate())

        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.if(env === 'production', $.uglify()))
        .pipe($.concat('app.js'))
        .pipe(gulp.dest(path.join(folders.dest, folders.scripts)))
        .pipe($.size({title: 'JS'}))

        .pipe($.if(env === 'development', $.livereload()))

        .pipe($.plumber.stop());


});

gulp.task('eslint', function() {

    var srcPaths = [
            path.join(folders.src, folders.core, folders.scripts, '**/*.js'),
            path.join(folders.src, folders.views, '**', folders.scripts, '**/*.js'),
            path.join(folders.src, folders.components, '**', folders.scripts, '**/*.js'),
        ];

    return gulp.src(srcPaths)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.eslint())
        .pipe($.eslint.format())

        .pipe($.plumber.stop());

});


// ------------------------------------ //
// ------------ LIBRARIES ------------- //
// ------------------------------------ //

gulp.task('lib', function() {

    var libPaths = [];

    for (var lib in npmLibraries) {
        libPaths = libPaths.concat(path.join('node_modules', lib, lib + '.js'));
    }

    libPaths = libPaths.concat(path.join(folders.src, folders.lib, '**/*.js'));

    return gulp.src(libPaths)
        .pipe($.plumber({errorHandler: onError}))

        .pipe($.newer(path.join(folders.dest, folders.scripts, 'lib.js')))
        .pipe($.ngAnnotate())

        .pipe($.concat('lib.js'))
        .pipe($.if(env === 'production', $.uglify()))
        .pipe(gulp.dest(path.join(folders.dest, folders.scripts)))
        .pipe($.size({title: 'JS'}))

        .pipe($.plumber.stop());

});


// ------------------------------------ //
// -------------- IMAGES -------------- //
// ------------------------------------ //

gulp.task('images', function() {

    var imagePaths = [
        path.join(folders.src, folders.core, folders.images, '**/*.{png,jpg,jpeg,gif,svg}'),
        path.join(folders.src, folders.views, '**', folders.images, '**/*.{png,jpg,jpeg,gif,svg}'),
        path.join(folders.src, folders.components, '**', folders.images, '**/*.{png,jpg,jpeg,gif,svg}')
    ];


    return gulp.src(imagePaths)
        .pipe($.plumber({errorHandler: onError}))

        .pipe($.newer(path.join(folders.dest, folders.images)))

        .pipe($.if(env === 'production', $.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(path.join(folders.dest, folders.images)))
        .pipe($.size({title: 'Images'}))

        .pipe($.if(env === 'development', $.livereload()))

        .pipe($.plumber.stop());

});


// ------------------------------------ //
// --------------- i18n --------------- //
// ------------------------------------ //

gulp.task('i18n', function() {

    var languageTasks = languages.map(function(language) {

            var languagePaths = [
                path.join(folders.src, folders.core, folders.i18n, language + '.json'),
                path.join(folders.src, folders.views, '**', folders.i18n, language + '.json'),
                path.join(folders.src, folders.components, '*', folders.i18n, language + '.json')
            ];

            return gulp.src(languagePaths)
                // .pipe($.debug())
                .pipe($.plumber({errorHandler: onError}))

                .pipe($.newer(path.join(folders.dest, folders.i18n, language + '.json')))

                .pipe($.extend(language + '.json'))
                .pipe($.specialHtml())
                .pipe(gulp.dest(path.join(folders.dest, folders.i18n)))
                .pipe($.size({title: 'i18n (' + language + ')'}))


                .pipe($.if(env === 'development', $.livereload()))

                .pipe($.plumber.stop());
        });


    return languageTasks;


});


// ------------------------------------ //
// --------------- HTML --------------- //
// ------------------------------------ //

gulp.task('html', function() {

    return gulp.src(path.join(folders.src, '*.html'))

        .pipe($.newer(path.resolve(folders.dest, '*.html')))

        .pipe($.replace(/__appName__/g, config.appName))
        .pipe($.replace(/__googleAnalyticsPropertyId__/g, config.googleAnalytics))

        .pipe($.if(env === 'production', $.stripCode({
            start_comment: "dev-code",
            end_comment: "end-dev-code"
        })))

        .pipe(gulp.dest(path.resolve(folders.dest)))
        .pipe($.size({title: 'HTML'}));
});




gulp.task('clean', function(cb) {

    del(folders.dest, {force: true}).then(function(deletedFiles) {
        console.log('CLEANED: ' + deletedFiles.join(', '));
        return cb();
    });

});


gulp.task('build-dev', function() {
    env = 'development';
    gulp.start(['watch', 'build']);
});

gulp.task('build-prod', function() {
    env = 'production';
    gulp.start(['build']);
});

gulp.task('build', ['clean'], function(){

    return gulp.start(['html', 'images', 'styles', 'eslint', 'scripts', 'lib', 'i18n']);

});
