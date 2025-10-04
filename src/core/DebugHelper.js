import allure from "@wdio/allure-reporter";
import Logger from "./Logger.js";
import { writeFile } from "fs/promises";
import { config } from "../../projects/autotests-for-magento-2-demo/config/wdio.conf.js";
import path from "path";

class DebugHelper {
  constructor() {
    this.debugDir = path.resolve(config.debugDir);
    this.screenshotsDir = path.join(this.debugDir, "screenshots");
    this.pageSourceDir = path.join(this.debugDir, "page_sources");
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
    const filePath = path.join(pathOfDir, `screenshot_${Date.now()}.png`);
    await writeFile(filePath, screenshot, "base64");

    Logger.info(`Saved screenshot: ${filePath}`);
  }

  attachScreenshotToAllure(screenshot) {
    allure.addAttachment(
      "Screenshot",
      Buffer.from(screenshot, "base64"),
      "image/png"
    );
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
    const filePath = path.join(pageSourceDir, `page_source_${Date.now()}.html`);
    await writeFile(filePath, pageSource, "utf-8");

    Logger.info(`Saved page source: ${filePath}`);
  }

  attachPageSourceToAllure(pageSource) {
    allure.addAttachment("Page source", pageSource, "text/html");
  }
}
export default new DebugHelper();
