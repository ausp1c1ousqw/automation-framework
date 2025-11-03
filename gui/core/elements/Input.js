import BaseElement from "../BaseElement.js";
import { getLogger } from "../../../utils/initFramework.js";
const logger = getLogger();

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
