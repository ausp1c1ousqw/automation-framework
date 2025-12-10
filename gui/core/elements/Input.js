import BaseElement from "../BaseElement.js";
import { config } from "automation-framework/di-container";

class Input extends BaseElement {
  constructor(elementOrLocator, name) {
    super(elementOrLocator, name, "Input");
  }
  async typeText(text) {
    await this.clear();
    await this.setValue(text);
  }
  async uploadFile(filePath) {
    this._log(`Uploading file: '${filePath}'`);
    const el = await this._getEl();

    await el.waitForExist({ timeout: config.timeouts.medium });
    const file = await browser.uploadFile(filePath);
    await el.setValue(file);
  }
}
export default Input;
