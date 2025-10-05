import allure from "@wdio/allure-reporter";
import { writeFile } from "fs/promises";
import path from "path";
import * as utils from "./utils.js";

class DebugHelper {
  constructor(debugDir) {
    this.debugDir = debugDir;
    utils.ensureDirExists(this.debugDir);

    this.screenshotsDir = path.join(this.debugDir, "screenshots");
    utils.ensureDirExists(this.screenshotsDir);

    this.pageSourceDir = path.join(this.debugDir, "page_sources");
    utils.ensureDirExists(this.pageSourceDir);
  }

  async takeScreenshot() {
    try {
      const screenshot = await browser.takeScreenshot();

      await this.saveScreenshot(screenshot, this.screenshotsDir);

      this.attachScreenshotToAllure(screenshot);
    } catch (e) {
      Logger.warn(`Failed to take screenshot due to error: ${e.message}`);
    }
  }

  async saveScreenshot(screenshot, pathOfDir) {
    const fileName = utils.generateFileName("", "png");
    const filePath = path.join(pathOfDir, fileName);
    await writeFile(filePath, screenshot, "base64");

    Logger.info(`Saved screenshot: ${filePath}`);
  }

  attachScreenshotToAllure(screenshot) {
    allure.addAttachment("Screenshot", Buffer.from(screenshot, "base64"), "image/png");
  }

  async getPageSource() {
    try {
      const pageSource = await browser.getPageSource();

      await this.savePageSource(pageSource, this.pageSourceDir);

      this.attachPageSourceToAllure(pageSource);
    } catch (e) {
      Logger.warn(`Failed to save page source due to error: ${e.message}`);
    }
  }

  async savePageSource(pageSource, pageSourceDir) {
    const fileName = utils.generateFileName("", "html");
    const filePath = path.join(pageSourceDir, fileName);
    await writeFile(filePath, pageSource, "utf-8");

    Logger.info(`Saved page source: ${filePath}`);
  }

  attachPageSourceToAllure(pageSource) {
    allure.addAttachment("Page source", pageSource, "text/html");
  }
}
export default DebugHelper;
