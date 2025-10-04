import * as pageHelpers from "./pageHelpers.js";
import * as utils from "./utils.js";
class BasePage {
  constructor(pageURL, mainEl, expectedTextOfMainEl) {
    this.pageURL = pageURL;
    this.mainEl = mainEl;
    this.expectedTextOfMainEl = expectedTextOfMainEl;
  }

  async open() {
    await utils.navigateTo(this.pageURL);
    await utils.waitForDocumentReadyState();
    await this.verifyPageMainElement();
  }

  async verifyPageMainElement() {
    await this.mainEl.waitForDisplayed();
    const actualText = await this.mainEl.getText();
    await pageHelpers.assertTextsWithLogging(
      actualText,
      this.expectedText,
      `Verifying main element of the page: ${this.mainEl.name}`
    );
  }

  async refresh() {}
  async back() {}
  async forward() {}
  async switchToFrame() {}
  async switchToWindow() {}
}
export default BasePage;
