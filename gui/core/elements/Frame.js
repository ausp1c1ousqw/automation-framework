import BaseElement from "../BaseElement.js";

class Frame extends BaseElement {
  constructor(elementOrLocator, name) {
    super(elementOrLocator, name, "Input");
  }
  async typeText(text) {
    await this.clear();
    await this.setValue(text);
  }
  async switchToFrame() {
    this._log(`Switching to frame: '${this.elementOrLocator}'`);
    const el = await this._getEl();

    await browser.switchToFrame(el);
  }

  async switchBack() {
    await browser.switchToParentFrame();
  }
}
export default Frame;
