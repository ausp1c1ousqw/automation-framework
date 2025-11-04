import path from "path";
import { writeFile } from "fs/promises";
import { ensureDirExists, generateTimestampedFileName } from "./fileHelpers.js";
import { getLogger } from "../di-container/di-container.js";

class PageSource {
  static async get() {
    const logger = getLogger();
    try {
      const pageSource = await browser.getPageSource();
      const pageSourceDir = ensureDirExists(`${fw.config.debugDirPath}/page_sources`);
      const pageSourceName = generateTimestampedFileName("html");
      const pageSourcePath = path.join(pageSourceDir, pageSourceName);

      await writeFile(pageSourcePath, pageSource, "utf-8");
      return { pageSourcePath, pageSource };
    } catch (err) {
      logger.warn(`Failed to get page source:  ${err.stack || err.message}`);
      return { pageSourcePath: null, pageSource: null };
    }
  }
}
export default PageSource;
