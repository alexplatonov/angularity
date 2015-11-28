// Karma configuration
var folders = {
  base: 'src/',
  javascript: 'scripts/',
  test: 'test/',
  components: 'components/'
};
module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // folders.base + folders.javascript + '{,**}/*.js',
      // folders.base + folders.components + '{,**}/*.js',
      // folders.base + folders.test + '{,**}/*.js'
    ],


    // list of files to exclude
    exclude: [],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // preprocessors: {
    //   // source files, that you wanna generate coverage for
    //   // do not include tests or libraries
    //   // (these files will be instrumented by Istanbul)
    //   'realtime-understanding/src/main/webapp/static/script/js/rtu.dev.js': ['coverage']
    // },

    // optionally, configure the reporter
    coverageReporter: {
      reporters: [
        {
          type: 'lcov',
          dir: 'reports/test-coverage/'
        },
        {
          type: 'text-summary'
        }
      ]
    },

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/core/scripts/**/*.js': ['coverage', 'babel'],
      'src/components/**/scripts/*.js': ['coverage', 'babel'],
      'src/views/**/scripts/*.js': ['coverage', 'babel']
    },


    // Babel
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
