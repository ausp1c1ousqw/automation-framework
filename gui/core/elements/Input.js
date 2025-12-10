import BaseElement from "../BaseElement.js";

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
    await el.waitForExist({ timeout });
    await el.setValue(filePath);
  }
}
export default Input;
