import * as pageHelpers from "./helpers.js";
import { expect } from "chai";
class BasePage {
  constructor(pageURL, mainEl, expectedTextOfMainEl) {
    this.pageURL = pageURL;
    this.mainEl = mainEl;
    this.expectedTextOfMainEl = expectedTextOfMainEl;
  }

  async open() {
    await pageHelpers.navigateTo(this.pageURL);
    await pageHelpers.waitForDocumentReadyState();
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
