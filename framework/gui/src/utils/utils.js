import allure from "@wdio/allure-reporter";
import { TIMEOUTS } from "../configs/timeouts.js";
// import { baseConfig as config } from "../../../src/wdio.base.conf.js";
import { logger } from "@sergey/core";
import DebugHelper from "./DebugHelper.js";

export async function performActionWithLogging(action, logMessage) {
  try {
    allure.startStep(logMessage);
    logger.info(logMessage);

    const result = await action();

    allure.endStep("passed");
    return result;
  } catch (error) {
    await performActionsOnError(error);
    throw error;
  }
}

async function performActionsOnError(error) {
  logger.error(error.message);
  allure.endStep("failed");

  await DebugHelper.takeScreenshot();
  await DebugHelper.getPageSource();
}

export async function waitForDocumentReadyState(timeout = TIMEOUTS.medium) {
  await performActionWithLogging(async () => {
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) === "complete",
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

function buildUrl(path) {
  // // const baseUrl = config.baseUrl;
  // // const url = path.startsWith("http") ? path : new URL(path, baseUrl).toString();
  // return url;
  return path;
}
