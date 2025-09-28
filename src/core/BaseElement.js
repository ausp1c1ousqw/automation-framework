import * as pageHelpers from "./helpers.js";
import { TIMEOUTS } from "../configs/timeouts.js";
import Logger from "./Logger.js";
class BaseElement {
  constructor(elementOrLocator, name, type) {
    this.elementOrLocator = elementOrLocator;
    this.name = name;
    this.type = type;
  }
  async getEl() {
    return typeof this.elementOrLocator === "string"
      ? $(this.elementOrLocator)
      : await this.elementOrLocator;
  }
  async doAction(action, message) {
    const el = await this.getEl();
    return await pageHelpers.doAction(
      () => action(el),
      message,
      this.type,
      this.name
    );
  }
  async waitForExist(timeout = TIMEOUTS.medium) {
    await this.doAction(async (el) => {
      await el.waitForExist({ timeout });
    }, "Waiting for element to exist");
  }
  async waitForDisplayed(timeout = TIMEOUTS.medium) {
    await this.doAction(async (el) => {
      await el.waitForDisplayed({ timeout });
    }, "Waiting for element to be displayed");
  }
  async waitForClickable(timeout = TIMEOUTS.medium) {
    await this.doAction(async (el) => {
      await el.waitForClickable({ timeout });
    }, "Waiting for element to be clickable");
  }

  async click() {
    await this.waitForDisplayed();
    await this.waitForClickable();
    await this.doAction(async (el) => {
      try {
        await el.click();
      } catch (error) {
        Logger.error(
          `${this.type} '${this.name}' :: JS fallback click due to error: ${error.message}`
        );
        await browser.execute((el) => el.click(), el);
      }
    }, "Clicking");
  }
  async getText() {
    const text = await this.doAction(
      async (el) => (await el.getText()).trim(),
      "Getting text from element"
    );
    await this.doAction(async () => text, `Text of the element: '${text}'`);
    return text;
  }

  async setValue(text) {
    await this.doAction(async (el) => {
      await el.setValue(text);
    }, `Typing '${text}'`);
  }
  async clearValue() {
    await this.doAction(async (el) => {
      await el.clearValue();
    }, "Clearing");
  }
  async getValue() {
    const el = await this.getEl();
    return await el.getValue();
  }
  async moveTo() {
    await this.doAction(async (el) => {
      await el.moveTo();
      await browser.execute((element) => {
        element.dispatchEvent(
          new MouseEvent("mouseover", { bubbles: true, cancelable: true })
        );
      }, el);
    }, "Move mouse to element");
  }
}
export default BaseElement;
