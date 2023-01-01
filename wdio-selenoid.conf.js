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
    exclude: [],
    maxInstances: 1,
    hostname: '85.119.145.3',
    port: 8080,
    path: '/wd/hub/',
    capabilities: [{
      maxInstances: 1,
      browserName: 'chrome',
      browserVersion: '95.0',
      acceptInsecureCerts: true,
      'goog:chromeOptions': { args: ['--window-size=1920,1080'] },
      'selenoid:options': {
        enableVNC: true,
        enableVideo: true
      }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 4000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'mocha',
    reporters: [['allure', {
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
