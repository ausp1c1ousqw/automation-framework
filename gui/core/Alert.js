import { logger, config } from "automation-framework/di-container";

class Alert {
  async waitForAlert(timeout = config.timeouts.medium) {
    await browser.waitUntil(async () => await browser.isAlertOpen(), {
      timeout,
    });
  }

  async accept() {
    logger.info(`Accepting Alert`);
    await this.waitForAlert();
    await browser.acceptAlert();
  }

  async dismiss() {
    logger.info(`Dismissing Alert`);
    await this.waitForAlert();
    await browser.dismissAlert();
  }

  async getText() {
    logger.info(`Getting text from Alert`);
    await this.waitForAlert();
    return await browser.getAlertText();
  }

  async sendText(text) {
    logger.info(`Typing text to Alert`);
    await this.waitForAlert();
    await browser.sendAlertText(text);
  }
}

export default new Alert();
