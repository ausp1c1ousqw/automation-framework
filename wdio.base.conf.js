import * as hooks from "./src/utils/hooks.js";

export const baseConfig = {
  baseUrl: process.env.BASE_URL || "https://magento2demo.firebearstudio.com/",
  debugDir: process.env.DEBUG_DIR || "./artifacts",

  runner: "local",

  maxInstances: 3,
  logLevel: "silent",
  waitforTimeout: 5000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  capabilities: [
    {
      browserName: "chrome",
      maxInstances: 3,
      "goog:chromeOptions": {
        args: ["--disable-notifications"],
      },
    },
  ],

  framework: "cucumber",

  before() {
    hooks.beforeHook(this.debugDir);
  },
  beforeScenario: hooks.beforeScenarioHook,
  afterScenario: hooks.afterScenarioHook,
  afterStep: hooks.afterStepHook,
  onError: hooks.onErrorHook,
};
