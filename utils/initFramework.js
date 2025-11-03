import fwConfig from "../config/config.js";
import Logger from "./Logger.js";
import HookManager from "./HookManager.js";
import fwHooks from "../config/hooks.js";
import deepmerge from "deepmerge";

let config = null;
let logger = null;

export function initFramework(projectConfig, loggerSettings) {
  config = deepmerge(fwConfig, projectConfig);
  logger = new Logger(loggerSettings);
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
export function getLogger() {
  return logger;
}

export function getConfig() {
  return config;
}
