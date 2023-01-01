const hooksConfig = require('./hooks.config')

exports.config = {
  ...hooksConfig,
  ...{
    specs: [
      './test/specs/**/*test.js'
    ],
    suites: {
      regression: [
        './test/specs/01_MainPageTests/04_addingItemToBasket_scrollingPizzasAndPage.test.js',
        './test/specs/09_MyAccountPageTests/01_authorization.test.js'
      ],
      networkTests: [
        './test/specs/11_NetworkTests/01_noPizzasOnPizzasPage.test.js',
        './test/specs/11_NetworkTests/02_500ErrorDuringPromoCodeApplying.test.js'
      ]
    },
    automationProtocol: 'devtools',
    exclude: [],
    maxInstances: 1,
    capabilities: [{
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': { args: ['--window-size=1920,1080'] }, // '--headless' '--incognito'
      'wdio:devtoolsOptions': { headless: true }
    }],
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    baseUrl: '',
    waitforTimeout: 4000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['devtools'], // ['devtools', [NetworkService]],
    framework: 'mocha',
    reporters: ['spec', ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]],
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000
    }
  }
}
