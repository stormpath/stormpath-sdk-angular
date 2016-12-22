var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
var JasmineReporters = require('jasmine-reporters');

exports.config = {
    allScriptsTimeout: 20000,

    specs: [
        './e2e/*.spec.ts'
    ],

    capabilities: {
        'browserName': 'firefox',
        'phantomjs.binary.path': require('phantomjs-prebuilt').path,
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
    },

    directConnect: true,

    baseUrl: 'http://localhost:8000/', // ?api=https://raible.apps.stormpath.io

    framework: 'jasmine2',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },

    beforeLaunch: function() {
        require('ts-node').register({
            project: ''
        });
    },

    onPrepare: function() {
        browser.driver.manage().window().setSize(1280, 1024);
        jasmine.getEnv().addReporter(new JasmineReporters.JUnitXmlReporter({
            savePath: 'dist/reports/e2e',
            consolidateAll: false
        }));
        jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
            dest: "dist/reports/e2e/screenshots"
        }));
    },

    useAllAngular2AppRoots: true
};
