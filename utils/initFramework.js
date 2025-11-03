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
  return new HookManager(fwHooks, projectHooks);
}

export function getLogger() {
  return logger;
}

export function getConfig() {
  return config;
}
