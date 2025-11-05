import fwConfig from "../config/projectConfig.js";
import { Logger } from "../utils/index.js";
import { setConfig, setLogger } from "../di-container/di-container.js";
import deepmerge from "deepmerge";

export function initFramework(projectConfig, loggerSettings) {
  const config = deepmerge(fwConfig, projectConfig);
  const logger = new Logger(loggerSettings);
  setConfig(config);
  setLogger(logger);
  console.log(config);
}
