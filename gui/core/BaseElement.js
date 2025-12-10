import { logger, config } from "automation-framework/di-container";
import { get } from "lodash-es";

class BaseElement {
  constructor(elementOrLocator, name, type) {
    this.elementOrLocator = elementOrLocator;
    this.name = name;
    this.type = type;
  }

  async click() {
    this._log("Clicking");
    const el = await this.#getReadyEl();
    await el.waitForClickable({ timeout: config.timeouts.medium });
    await this.#clickWithFallback(el);
  }

  async getText() {
    this._log(`Getting text`);
    const el = await this.#getReadyEl();
    const text = await el.getText();

    this._log(`Text of the element: '${text}'`);
    return text;
  }

  async waitSpecificText(expectedText, timeout = config.timeouts.medium) {
    this._log(`Waiting for specific text`);
    const el = await this.#getReadyEl();
    await browser.waitUntil(async () => (await el.getText()) === expectedText, { timeout });
  }

  async isSelected() {
    this._log(`Checking if element is selected`);
    const el = await this.#getReadyEl();
    const state = await el.isSelected();

    this._log(`Selected state: ${state}`);
    return state;
  }

  async setValue(text) {
    this._log(`Typing '${text}'`);
    const el = await this.#getReadyEl();
    await el.setValue(text);
  }

  async clear() {
    this._log(`Clearing`);
    const el = await this.#getReadyEl();
    await el.clearValue();
  }

  async getValue() {
    this._log(`Getting value`);
    const el = await this.#getReadyEl();
    const value = await el.getValue();
    this._log(`Value of the element: '${value}'`);
    return value;
  }

  async getAttribute(attribute) {
    this._log(`Getting attribute`);
    const el = await this.#getReadyEl();
    const value = await el.getAttribute(attribute);
    this._log(`Attribute of the element: '${value}'`);
    return value;
  }

  async moveTo() {
    this._log("Moving mouse to element");
    const el = await this.#getReadyEl();
    await el.moveTo();
    await browser.execute((element) => {
      element.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, cancelable: true }));
    }, el);
  }

  async getCssValue(property, path) {
    this._log(`Getting CSS value: '${path}' of property: '${property}'`);
    const el = await this.#getReadyEl();
    const cssProperty = await el.getCSSProperty(property);
    const value = get(cssProperty, path);
    this._log(`CSS value: '${value}'`);
    return value;
  }

  async #getReadyEl(timeout = config.timeouts.medium) {
    const el = await this._getEl();
    await el.waitForExist({ timeout });
    await el.waitForDisplayed({ timeout });
    return el;
  }

  async _getEl() {
    return typeof this.elementOrLocator === "string"
      ? $(this.elementOrLocator)
      : this.elementOrLocator;
  }

  async #clickWithFallback(el) {
    try {
      await el.click();
    } catch (error) {
      this._log(`JS fallback click due to error: ${error.message}`, "warn");
      await browser.execute((el) => el.click(), el);
    }
  }

  async _log(message, level = "info") {
    const fullMessage = `${this.type} '${this.name}' :: ${message}`;

    if (level === "info") logger.info(fullMessage);
    if (level === "warn") logger.warn(fullMessage);
    if (level === "error") logger.error(fullMessage);
  }
}
export default BaseElement;
