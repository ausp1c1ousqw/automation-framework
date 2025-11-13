import allure from "@wdio/allure-reporter";
import { onError } from "automation-framework/utils";
import { logger } from "automation-framework/di-container";

const hooks = {
  before: function (world) {
    logger.info(`Scenario Started: ${world.pickle.name}`);
  },

  beforeStep: function (step) {
    logger.info(`Step Started: ${step.text}`);
  },

  afterStep: async function (step, scenario, { error }) {
    logger.info(`Step Ended: ${step.text}`);

    const stepLogs = logger.getLogs();
    allure.addAttachment(`Logs for: ${step.text}`, stepLogs, "text/plain");

    logger.clearLogs();
    if (error) {
      await onError(error);
      throw error;
    }
  },

  after: function (world, result) {
    logger.info(`Scenario Ended: ${world.pickle.name}`);
  },
};
export default hooks;
