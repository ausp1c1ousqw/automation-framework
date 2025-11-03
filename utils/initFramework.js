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

export async function runHooks(projectHooks) {
  const hooks = new HookManager(fwHooks, projectHooks);
  await hooks.runAll();
}

export function getLogger() {
  return logger;
}

export function getConfig() {
  return config;
}
