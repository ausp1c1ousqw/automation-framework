import * as pageHelpers from "./pageHelpers.js";
import * as utils from "../utils/utils.js";
import { getLogger } from "../../utils/initFramework.js";
const logger = getLogger();

class BasePage {
  constructor(pageURL, mainEl, expectedTextOfMainEl) {
    this.pageURL = pageURL;
    this.mainEl = mainEl;
    this.expectedTextOfMainEl = expectedTextOfMainEl;
  }

  async open() {
    await utils.navigateTo(this.pageURL);
    await this.verifyPageOpened();
  }

  async verifyPageOpened() {
    await utils.waitForDocumentReadyState();
    await this.verifyPageMainElement();
  }

  async verifyPageMainElement() {
    await this.mainEl.waitForDisplayed();
    const actualText = await this.mainEl.getText();

    await pageHelpers.assertTextsWithLogging(
      actualText,
      this.expectedTextOfMainEl,
      `Verifying main element of the page: ${this.mainEl.name}`
    );
  }

  async refresh() {
    logger.info(`Refreshing page`);
    await browser.refresh();

    await this.verifyPageOpened();
  }

  async back() {
    logger.info(`Clicking back`);
    await browser.back();
  }

  async forward() {
    logger.info(`Clicking forward`);
    await browser.forward();
  }
}

export default BasePage;
