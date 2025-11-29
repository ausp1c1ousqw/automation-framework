import { expect } from "chai";
import { logger } from "automation-framework/di-container";

export async function assertWithLogging(actual, expected, message) {
  const fullMessage = `${message}
Actual: '${actual}' 
Expected: '${expected}'`;

  logger.info(fullMessage);
  expect(actual).to.equal(expected, message);
}
