import BaseElement from "../BaseElement.js";

class Input extends BaseElement {
  constructor(elementOrLocator, name) {
    super(elementOrLocator, name, "Input");
  }
  async typeText(text) {
    await this.waitForDisplayed();
    await this.clearValue();
    await this.setValue(text);
    const value = await this.getValue();
    if (value !== text) {
      throw new Error(
        `Entered value: "${value}" does not match expected: "${text}"`
      );
    }
  }
}
export default Input;
