import allure from "@wdio/allure-reporter";
import { TIMEOUTS } from "../configs/timeouts.js";
import { baseConfig as config } from "../../wdio.base.conf.js";
import fs from "fs";

export async function performActionWithLogging(action, logMessage) {
  try {
    allure.startStep(logMessage);
    Logger.info(logMessage);

    const result = await action();

    allure.endStep("passed");
    return result;
  } catch (error) {
    await performActionsOnError(error);
    throw error;
  }
}

async function performActionsOnError(error) {
  Logger.error(error.message);
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
  const baseUrl = config.baseUrl;
  const url = path.startsWith("http") ? path : new URL(path, baseUrl).toString();
  return url;
}

export function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function generateFileName(postfix = "", extension = "txt") {
  const now = new Date();
  const pad = (num, len = 2) => String(num).padStart(len, "0");

  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

  return `${dateStr}_${timeStr}${postfix}.${extension}`;
}
