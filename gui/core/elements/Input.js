import BaseElement from "../BaseElement.js";

class Input extends BaseElement {
  constructor(elementOrLocator, name) {
    super(elementOrLocator, name, "Input");
  }
  async typeText(text) {
    await this.clear();
    await this.setValue(text);
  }
}
export default Input;
