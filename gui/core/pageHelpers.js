import { expect } from "chai";
import { logger } from "automation-framework/di-container";

export async function assertTextsWithLogging(actualText, expectedText, message) {
  const fullMessage = `${message}
Actual: '${actualText}' 
Expected: '${expectedText}'`;

  logger.info(fullMessage);
  expect(actualText).to.equal(expectedText);
}
