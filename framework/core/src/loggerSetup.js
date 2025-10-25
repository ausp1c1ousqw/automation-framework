import Logger from "./Logger.js";

const logger = new Logger();

logger.info("Logger started");

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.stack || err}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

process.on("warning", (warning) => {
  logger.warn(`Warning: ${warning.stack || warning.message}`);
});

process.on("exit", (code) => {
  logger.info(`Process exiting with code: ${code}`);
});

export default logger;
