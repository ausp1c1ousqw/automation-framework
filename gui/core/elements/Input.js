import BaseElement from "../BaseElement.js";
import Framework from "../../configs/Framework.js";
const { logger } = Framework;

class Input extends BaseElement {
  constructor(elementOrLocator, name) {
    super(elementOrLocator, name, "Input");
  }
  async typeText(text) {
    await this.waitForDisplayed();
    await this.clear();
    await this.setValue(text);

    const value = await this.getValue();
    if (value !== text) {
      logger.warn(`Entered value: "${value}" does not match expected: "${text}"`);
    }
  }
}
export default Input;
