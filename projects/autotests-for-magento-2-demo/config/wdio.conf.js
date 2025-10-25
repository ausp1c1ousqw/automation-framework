export const config = {
  baseUrl: process.env.BASE_URL || "https://magento2demo.firebearstudio.com/",
  debugDir: process.env.DEBUG_DIR || "./artifacts",

  runner: "local",

  maxInstances: 1,
  logLevel: "silent",
  waitforTimeout: 5000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  capabilities: [
    {
      browserName: "chrome",
      maxInstances: 1,
      "goog:chromeOptions": {
        args: ["--disable-notifications"],
      },
    },
  ],

  framework: "cucumber",
  specs: ["../features/**/*.feature"],

  reporters: [
    [
      "allure",
      {
        outputDir: "./artifacts/allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
        useCucumberStepReporter: true,
      },
    ],
    [
      "junit",
      {
        outputDir: "./artifacts/reports",
        outputFileFormat: function (opts) {
          return `results-${opts.cid}.xml`;
        },
      },
    ],
  ],

  cucumberOpts: {
    require: ["./features/**/*.js"],
    backtrace: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "not @skip",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
