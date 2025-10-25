import allure from "@wdio/allure-reporter";
import { writeFile } from "fs/promises";
import path from "path";
import { logger, ensureDirExists, generateFileName } from "@sergey/core";

class DebugHelper {
  constructor() {}

  async takeScreenshot() {
    try {
      const screenshot = await browser.takeScreenshot();

      await this.#saveScreenshot(screenshot);

      this.#attachScreenshotToAllure(screenshot);
    } catch (e) {
      logger.warn(`Failed to take screenshot due to error: ${e.message}`);
    }
  }

  async getPageSource() {
    try {
      const pageSource = await browser.getPageSource();

      await this.#savePageSource(pageSource);

      this.#attachPageSourceToAllure(pageSource);
    } catch (e) {
      logger.warn(`Failed to save page source due to error: ${e.message}`);
    }
  }

  async #saveScreenshot(screenshot) {
    const screenshotsDir = ensureDirExists("artifacts/screenshots");
    const fileName = generateFileName("png");
    const filePath = path.join(screenshotsDir, fileName);
    await writeFile(filePath, screenshot, "base64");

    logger.info(`Saved screenshot: ${filePath}`);
  }

  #attachScreenshotToAllure(screenshot) {
    allure.addAttachment("Screenshot", Buffer.from(screenshot, "base64"), "image/png");
  }

  async #savePageSource(pageSource) {
    const pageSourceDir = ensureDirExists("artifacts/page_sources");
    const fileName = generateFileName("html");
    const filePath = path.join(pageSourceDir, fileName);
    await writeFile(filePath, pageSource, "utf-8");

    logger.info(`Saved page source: ${filePath}`);
  }

  #attachPageSourceToAllure(pageSource) {
    allure.addAttachment("Page source", pageSource, "text/html");
  }
}
export default new DebugHelper();
