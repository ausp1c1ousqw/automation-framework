import * as utils from "../utils/utils.js";
import { expect } from "chai";

export async function assertTextsWithLogging(actualText, expectedText, message) {
  await utils.performActionWithLogging(async () => {
    expect(actualText).to.equal(expectedText);
  }, message);
}
