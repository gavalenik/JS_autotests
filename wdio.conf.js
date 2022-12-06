const hooksConfig = require('./hooks.config');
//const { NetworkService } = require('./networkService');

exports.config = {
    ...hooksConfig,
    ...{
        specs: [
            './test/specs/**/*.js' //'./test/specs/**/*.js'
        ],
        automationProtocol: 'devtools',
        exclude: [],
        maxInstances: 1,
        capabilities: [{
            maxInstances: 5,
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {args: ['--window-size=1920,1080']}, //'--headless','--incognito'
        }],
        // Level of logging verbosity: trace | debug | info | warn | error | silent
        logLevel: 'info',
        // If you only want to run your tests until a specific amount of tests have failed use
        // bail (default is 0 - don't bail, run all tests).
        bail: 0,
        baseUrl: '',
        waitforTimeout: 10000,
        connectionRetryTimeout: 120000,
        connectionRetryCount: 3,
        services: ['devtools'], //TODO ['devtools', [NetworkService]]
        framework: 'mocha',
        reporters: ['spec'], //TODO Allure
        mochaOpts: {
            ui: 'bdd',
            timeout: 60000
        }
    }
}
