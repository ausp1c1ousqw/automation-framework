export const config = {
  baseUrl: process.env.BASE_URL || "https://magento2demo.firebearstudio.com/",

  runner: "local",

  specs: ["../features/**/*.feature"],

  maxInstances: 1,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--disable-notifications"],
      },
    },
  ],

  logLevel: "silent",

  bail: 0,

  waitforTimeout: 5000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  framework: "cucumber",

  reporters: [
    [
      "allure",
      {
        outputDir: "./projects/autotests-for-magento-2-demo/allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
        useCucumberStepReporter: true,
      },
    ],
  ],

  cucumberOpts: {
    require: ["./projects/autotests-for-magento-2-demo/features/**/*.js"],
    backtrace: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "not @skip",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
