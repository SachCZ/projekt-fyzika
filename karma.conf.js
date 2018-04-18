// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli', "viewport"],
    plugins: [
      require('karma-viewport'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    viewport: {
      breakpoints: [
        {
          name: "xs",
          size: {
            width: 560,
            height: 560
          }
        },
        {
          name: "sm",
          size: {
            width: 768,
            height: 1280
          }
        },
        {
          name: "md",
          size: {
            width: 1024,
            height: 768
          }
        },
        {
          name: "lg",
          size: {
            width: 1440,
            height: 900
          }
        },
        {
          name: "xl",
          size: {
            width: 2560,
            height: 1440
          }
        }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
