import Screenshot from "./Screenshot.js";
import PageSource from "./PageSource.js";
import { getLogger } from "../di-container/di-container.js";

export default async function (error) {
  const logger = getLogger();
  logger.error(error);

  const { screenshotPath, screenshot } = await Screenshot.take();
  logger.info(`Screenshot path: ${screenshotPath}`);
  allure.addAttachment("Screenshot", Buffer.from(screenshot, "base64"), "image/png");

  const { pageSourcePath, pageSource } = await PageSource.get();
  logger.info(`Page Source path: ${pageSourcePath}`);
  allure.addAttachment("Page source", pageSource, "text/html");
}
