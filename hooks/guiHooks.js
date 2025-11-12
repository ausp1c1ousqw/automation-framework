import allure from "@wdio/allure-reporter";
import { onError } from "automation-framework/utils";
import { logger } from "automation-framework/di-container";

const hooks = {
  before: function (world) {
    logger.info(`Scenario started: ${world.pickle.name}`);
  },

  beforeStep: function (step) {
    logger.info(`Step: ${step.text}`);
  },

  afterStep: async function (step, scenario, { error }) {
    try {
      logger.info(`Step ended: ${step.text}`);

      const stepLogs = logger.getLogs();
      allure.addAttachment(`Logs for: ${step.text}`, stepLogs, "text/plain");

      logger.clearLogs();
    } catch (error) {
      await onError(error);
      throw error;
    }
  },

  after: function (world, result) {
    logger.info(`=== End Scenario: ${world.pickle.name} ===`);
  },
};
export default hooks;
