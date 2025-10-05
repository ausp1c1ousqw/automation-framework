import { baseConfig } from "../../../wdio.base.conf.js";
export const config = {
  ...baseConfig,
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
