import { get } from "lodash-es";
import chai from "chai";
import chaiSubset from "chai-subset";
import { logger } from "automation-framework/di-container";
chai.use(chaiSubset);
const { expect } = chai;

class Response {
  constructor(res) {
    this.res = res;
    this.#logResponse();
  }

  verifyStatus(expected) {
    this.#log(`Status = '${expected}'`);
    expect(this.res.status).to.equal(expected);
    return this;
  }

  verifyProperty(path, expected) {
    const actual = this.#get(path);
    this.#log(`Property '${path}' exists`);
    expect(actual).to.exist;

    if (expected !== undefined) {
      this.#log(`Property '${path}' = '${expected}'`);
      expect(actual).to.equal(expected);
    }
    return this;
  }

  contains(expected) {
    this.#log(`Response includes ${JSON.stringify(expected, null, 2)}`);
    expect(this.#get()).to.containSubset(expected);
    return this;
  }

  includes(path, substring) {
    this.#log(`Property '${path}' includes '${substring}'`);
    expect(this.#get(path)).to.include(substring);
    return this;
  }

  greaterThan(path, expected) {
    this.#log(`Property '${path}' > ${expected}`);
    expect(this.#get(path)).to.be.greaterThan(expected);
    return this;
  }

  lessThan(path, expected) {
    this.#log(`Property '${path}' < ${expected}`);
    expect(this.#get(path)).to.be.lessThan(expected);
    return this;
  }

  verifyType(path, expected) {
    this.#log(`Property '${path}' is '${expected}'`);
    expect(this.#get(path)).to.be.a(expected);
    return this;
  }

  verifyKeysInArray(path, keys) {
    const array = this.#get(path);
    this.#log(`Property '${path}' contains keys: [${keys.join(", ")}]`);
    array.forEach((item) => {
      keys.forEach((key) => {
        expect(item).to.have.property(key);
      });
    });
    return this;
  }

  expectPropertyToBeRecent(path, toleranceMs = 5000) {
    const actual = new Date(this.#get(path)).getTime();
    const now = Date.now();
    this.#log(`${path} = ${actual}, expected within ${toleranceMs}ms of now`);

    expect(actual).to.be.closeTo(now, toleranceMs);
    return this;
  }

  #logResponse() {
    const logMessage = `RESPONSE ::
    Status: ${this.res.status}
    Body: ${JSON.stringify(this.res.body, null, 2)}`;
    logger.info(logMessage);
  }

  #get(path) {
    if (!path) return this.res.body;
    return get(this.res.body, path);
  }

  #log(message) {
    logger.info(`CHECK :: ${message}`);
  }
}
export default Response;
