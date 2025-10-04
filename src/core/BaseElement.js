import * as utils from "./utils.js";
import { TIMEOUTS } from "../configs/timeouts.js";
import Logger from "./Logger.js";
import allure from "@wdio/allure-reporter";
class BaseElement {
  constructor(elementOrLocator, name, type) {
    this.elementOrLocator = elementOrLocator;
    this.name = name;
    this.type = type;
  }

  async performActionWithLogging(action, message) {
    const el = await this.getEl();
    const fullMessage = `${this.type} '${this.name}' :: ${message}`;
    return await utils.performActionWithLogging(() => action(el), fullMessage);
  }

  async getEl() {
    return typeof this.elementOrLocator === "string"
      ? $(this.elementOrLocator)
      : await this.elementOrLocator;
  }

  async waitForExist(timeout = TIMEOUTS.medium) {
    await this.performActionWithLogging(async (el) => {
      await el.waitForExist({ timeout });
    }, "Waiting for element to exist");
  }

  async waitForDisplayed(timeout = TIMEOUTS.medium) {
    await this.performActionWithLogging(async (el) => {
      await el.waitForDisplayed({ timeout });
    }, "Waiting for element to be displayed");
  }

  async waitForClickable(timeout = TIMEOUTS.medium) {
    await this.performActionWithLogging(async (el) => {
      await el.waitForClickable({ timeout });
    }, "Waiting for element to be clickable");
  }

  async click() {
    await this.waitForDisplayed();
    await this.waitForClickable();
    await this.clickWithFallback();
  }

  async clickWithFallback() {
    await this.performActionWithLogging(async (el) => {
      try {
        await el.click();
      } catch (error) {
        await this.JSClickOnError(el, error);
      }
    }, "Clicking");
  }

  async JSClickOnError(el, error) {
    const message = `${this.type} '${this.name}' :: JS fallback click due to error: ${error.message}`;
    Logger.warn(message);
    allure.step(message);
    await browser.execute((el) => el.click(), el);
  }

  async getText() {
    const text = await this.performActionWithLogging(
      async (el) => (await el.getText()).trim(),
      "Getting text from element"
    );

    await this.performActionWithLogging(
      async () => text,
      `Text of the element: '${text}'`
    );
    return text;
  }

  async setValue(text) {
    await this.performActionWithLogging(async (el) => {
      await el.setValue(text);
    }, `Typing '${text}'`);
  }

  async clear() {
    await this.performActionWithLogging(async (el) => {
      await el.clearValue();
    }, "Clearing");
  }

  async getValue() {
    const el = await this.getEl();
    return await el.getValue();
  }

  async moveTo() {
    await this.performActionWithLogging(async (el) => {
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
