import allure from "@wdio/allure-reporter";
import Screenshot from "../utils/Screenshot.js";
import PageSource from "../utils/PageSource.js";
import { getLogger } from "../utils/initFramework.js";

const hooks = {
  beforeScenario: async function (world) {
    const logger = getLogger();
    logger.info(`Scenario started: ${world.pickle.name}`);
  },

  beforeStep: async function (step) {
    const logger = getLogger();
    logger.info(`Step: ${step.text}`);
  },

  afterStep: async function (step, scenario, { error }) {
    const logger = getLogger();
    logger.info(`Step ended: ${step.text}`);

    const stepLogs = logger.getLogs();
    allure.addAttachment(`Logs for: ${step.text}`, stepLogs, "text/plain");

    logger.clear();
  },

  afterScenario: async function (world, result) {
    const logger = getLogger();
    logger.info(`=== End Scenario: ${world.pickle.name} ===`);
  },

  onError: async function (error) {
    const logger = getLogger();
    logger.error(error);

    const { screenshotPath, screenshot } = await Screenshot.take();
    logger.info(`Screenshot path: ${screenshotPath}`);
    allure.addAttachment("Screenshot", Buffer.from(screenshot, "base64"), "image/png");

    const { pageSourcePath, pageSource } = await PageSource.get();
    logger.info(`Page Source path: ${pageSourcePath}`);
    allure.addAttachment("Page source", pageSource, "text/html");
  },
};
export default hooks;
