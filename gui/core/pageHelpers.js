import { expect } from "chai";
import { getLogger } from "../utils/initFramework.js";
const logger = getLogger();

export async function assertTextsWithLogging(actualText, expectedText, message) {
  const fullMessage = `${message}
Actual: '${actualText}' 
Expected: '${expectedText}'`;

  logger.info(fullMessage);
  expect(actualText).to.equal(expectedText);
}
