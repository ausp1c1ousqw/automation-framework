import * as pageHelpers from "./pageHelpers.js";
import * as utils from "../utils/utils.js";
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
    utils.performActionWithLogging(async () => {
      await browser.refresh();
    }, `Refreshing page`);
    await this.verifyPageOpened();
  }

  async back() {
    utils.performActionWithLogging(async () => {
      await browser.back();
    }, `Clicking back`);
  }

  async forward() {
    utils.performActionWithLogging(async () => {
      await browser.forward();
    }, `Clicking forward`);
  }

  async switchToFrame() {}
  async switchToWindow() {}
}
export default BasePage;
