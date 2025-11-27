import { Logger } from "automation-framework/utils";
import { setLogger } from "automation-framework/di-container";

export function initLogger(loggerSettings) {
  const logger = new Logger(loggerSettings);

  setLogger(logger);

  process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception: ${err.stack || err}`);
  });

  process.on("unhandledRejection", (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });
}
