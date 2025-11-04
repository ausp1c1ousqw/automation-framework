import fwConfig from "../config/projectConfig.js";
import { Logger } from "../utils";
import fwHooks from "../hooks/hooks.js";
import { setConfig, setLogger } from "../di-container/di-container.js";
import deepmerge from "deepmerge";

export function initFramework(projectConfig, loggerSettings) {
  const config = deepmerge(fwConfig, projectConfig);
  const logger = new Logger(loggerSettings);
  setConfig(config);
  setLogger(logger);
}

export async function initHooks(projectHooks) {
  const result = { fwHooks };

  for (const key in projectHooks) {
    if (!result[key]) {
      result[key] = projectHooks[key];
    } else {
      const defaultFn = result[key];
      const projectFn = projectHooks[key];

      result[key] = async (...args) => {
        await defaultFn(...args);
        await projectFn(...args);
      };
    }
  }

  return result;
}
