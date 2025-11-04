import { expect } from "chai";
import { logger } from "../../di-container/di-container.js";

export async function assertTextsWithLogging(actualText, expectedText, message) {
  const fullMessage = `${message}
Actual: '${actualText}' 
Expected: '${expectedText}'`;

  logger.info(fullMessage);
  expect(actualText).to.equal(expectedText);
}
