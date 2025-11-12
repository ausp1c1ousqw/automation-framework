import allure from "@wdio/allure-reporter";
import { logger } from "../di-container/di-container.js";

const hooks = {
  before: function (world) {
    logger.info(`Scenario started: ${world.pickle.name}`);
  },

  afterStep: async function (step, scenario, { error }) {
    try {
      const stepLogs = logger.getLogs();
      allure.addAttachment(`Logs for: ${step.text}`, stepLogs, "text/plain");

      logger.clearLogs();
    } catch (error) {
      logger.error(error);
      throw error;
    }
  },

  after: function (world, result) {
    logger.info(`=== End Scenario: ${world.pickle.name} ===`);
  },
};
export default hooks;
