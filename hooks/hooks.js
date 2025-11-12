import allure from "@wdio/allure-reporter";
import { onError } from "../utils/index.js";
import { logger } from "../di-container/di-container.js";

const hooks = {
  before: function (world) {
    // const logger = getLogger();
    logger.info(`Scenario started: ${world.pickle.name}`);
  },

  beforeStep: function (step) {
    // const logger = getLogger();
    logger.info(`Step: ${step.text}`);
  },

  afterStep: async function (step, scenario, { error }) {
    // const logger = getLogger();
    try {
      logger.info(`Step ended: ${step.text}`);

      const stepLogs = logger.getLogs();
      allure.addAttachment(`Logs for: ${step.text}`, stepLogs, "text/plain");

      logger.clearLogs();
    } catch (error) {
      await onError(error);
    }
  },

  after: function (world, result) {
    // const logger = getLogger();

    logger.info(`=== End Scenario: ${world.pickle.name} ===`);
  },
};
export default hooks;
