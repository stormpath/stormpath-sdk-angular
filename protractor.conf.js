var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
var JasmineReporters = require('jasmine-reporters');

exports.config = {
  allScriptsTimeout: 20000,

  specs: [
    './e2e/*.spec.ts'
  ],

  capabilities: {
    'browserName': 'chrome',
    'phantomjs.binary.path': require('phantomjs-prebuilt').path,
    'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG'],
    marionette: false
  },

  directConnect: true,

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine2',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  beforeLaunch: function () {
    require('ts-node').register({
      project: ''
    });
  },

  onPrepare: function () {
    browser.driver.manage().window().setSize(1280, 1024);
    jasmine.getEnv().addReporter(new JasmineReporters.JUnitXmlReporter({
      savePath: 'dist/reports/e2e',
      consolidateAll: false
    }));
    jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
      dest: "dist/reports/e2e/screenshots"
    }));
    if (browser.params.api) {
      browser.baseUrl = browser.baseUrl + '?api=' + browser.params.api
    }
    if (browser.params.storage) {
      browser.baseUrl = (browser.baseUrl.indexOf('?') > -1) ? browser.baseUrl + '&' : browser.baseUrl + '?';
      browser.baseUrl += 'storage=' + browser.params.storage;
    }
  },

  useAllAngular2AppRoots: true
};
