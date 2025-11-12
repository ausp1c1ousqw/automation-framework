import fwConfig from "../config/projectConfig.js";
import { Logger } from "automation-framework/utils";
import { setConfig, setLogger } from "automation-framework/di-container";
import deepmerge from "deepmerge";

export function initFramework(projectConfig, loggerSettings) {
  const config = deepmerge(fwConfig, projectConfig);
  const logger = new Logger(loggerSettings);

  setConfig(config);
  setLogger(logger);

  process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception: ${err.stack || err}`);
  });

  process.on("unhandledRejection", (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });
}
