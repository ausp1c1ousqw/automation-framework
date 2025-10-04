import allure from "@wdio/allure-reporter";
import { TIMEOUTS } from "../configs/timeouts.js";
import Logger from "./Logger.js";
import { config } from "../../projects/autotests-for-magento-2-demo/config/wdio.conf.js";
import DebugHelper from "./DebugHelper.js";

export async function performActionWithLogging(action, logMessage) {
  try {
    allure.startStep(logMessage);
    Logger.info(logMessage);

    const result = await action();

    allure.endStep("passed");
    return result;
  } catch (error) {
    await perfomActionsOnError(error);
    throw error;
  }
}

async function perfomActionsOnError(error) {
  Logger.error(error.message);
  allure.endStep("failed");

  await DebugHelper.takeScreenshot();
  await DebugHelper.getPageSource();
}

export async function waitForDocumentReadyState(timeout = TIMEOUTS.medium) {
  await performActionWithLogging(async () => {
    await browser.waitUntil(
      async () =>
        (await browser.execute(() => document.readyState)) === "complete",
      { timeout }
    );
  }, "Waiting for the page to be fully loaded");
}

export async function navigateTo(path) {
  const fullUrl = await performActionWithLogging(() => {
    return buildUrl(path);
  }, `Build full URL from path: ${path}`);

  await performActionWithLogging(async () => {
    await browser.url(fullUrl);
  }, `Navigate to: "${fullUrl}"`);
}

async function buildUrl(path) {
  const baseUrl = config.baseUrl;
  const url = path.startsWith("http")
    ? path
    : new URL(path, baseUrl).toString();
  return url;
}
