import path from "path";
import { writeFile } from "fs/promises";
import { ensureDirExists, generateTimestampedFileName } from "./fileHelpers.js";
import { getLogger, getConfig } from "../di-container/di-container.js";

class Screenshot {
  static async take() {
    const logger = getLogger();
    const config = getConfig();
    try {
      const screenshot = await browser.takeScreenshot();
      const screenshotsDir = ensureDirExists(`${config.debugDirPath}//screenshots`);
      const screenshotName = generateTimestampedFileName("png");
      const screenshotPath = path.join(screenshotsDir, screenshotName);

      await writeFile(screenshotPath, screenshot, "base64");
      return { screenshotPath, screenshot };
    } catch (err) {
      logger.warn(`Failed to take screenshot:  ${err.stack || err.message}`);
      return { screenshotPath: null, screenshot: null };
    }
  }
}
export default Screenshot;
