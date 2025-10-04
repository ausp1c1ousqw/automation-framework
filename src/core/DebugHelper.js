import allure from "@wdio/allure-reporter";
import Logger from "./Logger.js";
import fs from "fs";
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

      const filePath = path.join(
        this.screenshotsDir,
        `screenshot_${Date.now()}.png`
      );
      await fs.writeFile(filePath, screenshot, "base64");

      allure.addAttachment(
        "Screenshot",
        Buffer.from(screenshot, "base64"),
        "image/png"
      );
      Logger.info(`Saved screenshot: ${filePath}`);
    } catch (e) {
      Logger.warn(`Failed to take screenshot due to error: ${e.message}`);
    }
  }

  async getPageSource() {
    try {
      const pageSource = await browser.getPageSource();

      const filePath = path.join(
        this.pageSourceDir,
        `page_source_${Date.now()}.html`
      );
      await fs.writeFile(filePath, pageSource, "utf-8");

      allure.addAttachment("Page source", pageSource, "text/html");
      Logger.info(`Saved page source: ${filePath}`);
    } catch (e) {
      Logger.warn(`Failed to save page source due to error: ${e.message}`);
    }
  }
}
export default new DebugHelper();
