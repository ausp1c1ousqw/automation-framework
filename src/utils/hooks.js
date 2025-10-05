import Logger from "./Logger.js";
import DebugHelper from "./DebugHelper.js";
import BasePage from "../core/BasePage.js";
import * as pageHelpers from "../core/pageHelpers.js";
import { Button, Input, Checkbox, Label, Link, Dropdown } from "../core/index.js";

export function beforeHook(debugDir) {
  global.Logger = new Logger(debugDir);
  global.DebugHelper = new DebugHelper(debugDir);
  global.BasePage = BasePage;
  global.pageHelpers = pageHelpers;
  global.Button = Button;
  global.Input = Input;
  global.Checkbox = Checkbox;
  global.Label = Label;
  global.Link = Link;
  global.Dropdown = Dropdown;
}

export function afterStepHook(step, scenario, { error }) {
  if (error) {
    const errMessage = error instanceof Error ? error.stack : JSON.stringify(error);
    global.Logger.error(`Step failed: "${step?.text}"\n${errMessage}`);
  }
}

export function onErrorHook(error) {
  const errMessage = error instanceof Error ? error.stack : JSON.stringify(error);
  global.Logger.error(errMessage);
}

export function beforeScenarioHook(scenario) {
  const scenarioName = scenario.pickle.name;
  const featureName = scenario.gherkinDocument.feature.name;

  global.Logger.info(`=== START SCENARIO ===`);
  global.Logger.info(`Feature: ${featureName}`);
  global.Logger.info(`Scenario: ${scenarioName}`);
  global.Logger.info(`======================`);
}

export function afterScenarioHook(scenario, result) {
  const scenarioName = scenario.pickle.name;
  const duration = result?.result?.duration?.seconds || 0;

  global.Logger.info(`=== END SCENARIO ===`);
  global.Logger.info(`Scenario: ${scenarioName}`);
  global.Logger.info(`====================`);
}
