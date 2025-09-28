import allure from "@wdio/allure-reporter";
import { TIMEOUTS } from "../configs/timeouts.js";
import Logger from "./Logger.js";
import { config } from "../../projects/autotests-for-magento-2-demo/config/wdio.conf.js";

/**
 * Waits until document.readyState is "complete"
 * @param {number} [timeout = TIMEOUTS.medium] - Timeout in milliseconds (default from TIMEOUTS.medium)
 * @returns {Promise<void>}
 */
export async function waitForDocumentReady(timeout = TIMEOUTS.medium) {
  await this.doAction(
    async () => {
      await browser.waitUntil(
        async () =>
          (await browser.execute(() => document.readyState)) === "complete",
        { timeout }
      );
    },
    "Waiting for the page to be fully loaded",
    "Navigation"
  );
}
/**
 * Builds a full URL from a relative or absolute path
 * @param {string} path -  Relative or full URL path
 * @returns {Promise<string>} - Full URL
 */
export async function buildUrl(path) {
  const baseUrl = config.baseUrl;
  if (!baseUrl) {
    throw new Error("baseUrl is not set in config");
  }
  const url = path.startsWith("http")
    ? path
    : new URL(path, baseUrl).toString();
  return url;
}

export async function doAction(action, message, type, name = "") {
  const logMessage =
    name !== "" ? `${type} '${name}' :: ${message}` : `${type} :: ${message}`;

  try {
    allure.startStep(logMessage);
    Logger.info(logMessage);

    const result = await action();

    allure.endStep("passed");
    return result;
  } catch (error) {
    Logger.error(`${type} '${name}' :: Error: ${error.message}`);

    allure.addAttachment("Error", error.stack || error.message, "text/plain");
    await takeScreenshot();
    await getPageSource();

    allure.endStep("failed");
    throw error;
  }
}
export async function takeScreenshot() {
  try {
    Logger.info(`Taking screenshot on failure`);
    const screenshot = await browser.takeScreenshot();
    allure.addAttachment(
      "Screenshot",
      Buffer.from(screenshot, "base64"),
      "image/png"
    );
  } catch (e) {
    Logger.warn(`Failed to take screenshot due to error: ${e.message}`);
  }
}
export async function getPageSource() {
  try {
    Logger.info(`Saving page source on failure`);
    const pageSource = await browser.getPageSource();
    allure.addAttachment("Page source", pageSource, "text/html");
  } catch (e) {
    Logger.warn(`Failed to save page source due to error: ${e.message}`);
  }
}
