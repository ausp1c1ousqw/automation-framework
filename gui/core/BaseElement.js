import { logger, config } from "automation-framework/di-container";

class BaseElement {
  constructor(elementOrLocator, name, type) {
    this.elementOrLocator = elementOrLocator;
    this.name = name;
    this.type = type;
  }

  async click() {
    await this.waitForDisplayed();
    await this.waitForClickable();
    await this.#clickWithFallback();
  }

  async getText() {
    const text = await this.#actionOnElement(
      async (el) => (await el.getText()).trim(),
      "Getting text from element"
    );

    logger.info(`Text of the element: '${text}'`);
    return text;
  }

  async setValue(text) {
    await this.#actionOnElement(async (el) => {
      await el.setValue(text);
    }, `Typing '${text}'`);
  }

  async clear() {
    await this.#actionOnElement(async (el) => {
      await el.clearValue();
    }, "Clearing");
  }

  async getValue() {
    const el = await this.#getEl();
    return await el.getValue();
  }

  async moveTo() {
    await this.#actionOnElement(async (el) => {
      await el.moveTo();
      await browser.execute((element) => {
        element.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, cancelable: true }));
      }, el);
    }, "Move mouse to element");
  }

  async waitForExist(timeout = config.timeouts.medium) {
    await this.#actionOnElement(async (el) => {
      await el.waitForExist({ timeout });
    }, "Waiting for element to exist");
  }

  async waitForDisplayed(timeout = config.timeouts.medium) {
    await this.#actionOnElement(async (el) => {
      await el.waitForDisplayed({ timeout });
    }, "Waiting for element to be displayed");
  }

  async waitForClickable(timeout = config.timeouts.medium) {
    await this.#actionOnElement(async (el) => {
      await el.waitForClickable({ timeout });
    }, "Waiting for element to be clickable");
  }

  async #actionOnElement(action, message) {
    const fullMessage = `${this.type} '${this.name}' :: ${message}`;
    logger.info(fullMessage);

    const el = await this.#getEl();
    return await action(el);
  }

  async #getEl() {
    return typeof this.elementOrLocator === "string"
      ? $(this.elementOrLocator)
      : await this.elementOrLocator;
  }

  async #clickWithFallback() {
    await this.#actionOnElement(async (el) => {
      try {
        await el.click();
      } catch (error) {
        await this.#clickViaJS(el, error);
      }
    }, "Clicking");
  }

  async #clickViaJS(el, error) {
    const message = `${this.type} '${this.name}' :: JS fallback click due to error: ${error.message}`;
    logger.warn(message);

    await browser.execute((el) => el.click(), el);
  }
}
export default BaseElement;
