import { fwConfig } from "automation-framework/config";
import { setConfig } from "automation-framework/di-container";
import deepmerge from "deepmerge";

export function initConfig(projectConfig) {
  const config = deepmerge(fwConfig, projectConfig);
  setConfig(config);
}
