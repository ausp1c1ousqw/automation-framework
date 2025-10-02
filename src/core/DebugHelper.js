import allure from "@wdio/allure-reporter";
import Logger from "./Logger";
import fs from "fs";
class DebugHelper {
  async takeScreenshot() {
    try {
      const screenshot = await browser.takeScreenshot();

      const filePath = `./screenshots/screenshot_${Date.now()}.png`;
      fs.writeFileSync(filePath, screenshot, "base64");

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

      const filePath = `./screenshots/page_source_${Date.now()}.png`;
      fs.writeFileSync(filePath, pageSource, "utf-8");

      allure.addAttachment("Page source", pageSource, "text/html");
      Logger.info(`Saved page source: ${filePath}`);
    } catch (e) {
      Logger.warn(`Failed to save page source due to error: ${e.message}`);
    }
  }
}
export default DebugHelper;
