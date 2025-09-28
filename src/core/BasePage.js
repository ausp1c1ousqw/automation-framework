import * as pageHelpers from "./helpers.js";
import { expect } from "chai";
class BasePage {
  constructor(mainEl, expectedText) {
    this.mainEl = mainEl;
    this.expectedText = expectedText;
  }

  async navigateTo(path) {
    const url = await pageHelpers.doAction(
      async () => {
        return await pageHelpers.buildUrl(path);
      },
      `Building full URL for path: '${path}'`,
      "Navigation"
    );
    await pageHelpers.doAction(
      async () => {
        await browser.url(url);
        await this.verifyPageOpened();
      },
      `Navigating to the ${url}`,
      "Navigation"
    );
  }
  async verifyPageOpened() {
    await pageHelpers.waitForDocumentReady();
    await this.mainEl.waitForDisplayed();
    const actual = await this.mainEl.getText();
    await this.verifyText(actual, this.expectedText);
  }

  async verifyText(actualText, expectedText) {
    await pageHelpers.doAction(
      async () => {
        expect(actualText).to.equal(expectedText);
      },
      `Compare actual: '${actualText}' to expected: '${expectedText}'`,
      "Comparing"
    );
  }
}
export default BasePage;
