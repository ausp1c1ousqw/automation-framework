import allure from "@wdio/allure-reporter";
import { logger } from "automation-framework/di-container";

const hooks = {
  before: function () {},

  afterStep: function (step, scenario, { error }) {
    const stepLogs = logger.getLogs();
    allure.addAttachment(`Logs for: ${step.text}`, stepLogs, "text/plain");

    logger.clearLogs();

    if (error) {
      logger.error(error.message || error);
      throw error;
    }
  },

  after: function (world, result) {
    logger.info(`Scenario Ended: ${world.pickle.name}`);
  },
};
export default hooks;
