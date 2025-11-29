import BaseElement from "../BaseElement.js";

class Input extends BaseElement {
  constructor(elementOrLocator, name) {
    super(elementOrLocator, name, "Input");
  }
  async typeText(text) {
    await this.clear();
    await this.setValue(text);

    const value = await this.getValue();
    if (value !== text) {
      this._log(`Entered value: "${value}" does not match expected: "${text}"`, "warn");
    }
  }
}
export default Input;
