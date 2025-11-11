import supertest from "supertest";
import { logger, config, getConfig } from "../di-container/di-container.js";

class Request {
  constructor(responseWrapper) {
    this.request = supertest(config.baseApi);
    this.headers = config.headers;
    this.responseWrapper = responseWrapper;
  }

  async get(endpoint, headers = {}) {
    return this.#send("get", endpoint, null, headers);
  }

  async post(endpoint, body, headers = {}) {
    return this.#send("post", endpoint, body, headers);
  }

  async put(endpoint, body, headers = {}) {
    return this.#send("put", endpoint, body, headers);
  }

  async patch(endpoint, body, headers = {}) {
    return this.#send("patch", endpoint, body, headers);
  }

  async delete(endpoint, headers = {}) {
    return this.#send("delete", endpoint, null, headers);
  }

  async #send(method, endpoint, body = null, headers = {}) {
    const combinedHeaders = { ...this.headers, ...headers };

    this.#logRequest(method, endpoint, combinedHeaders, body);

    const request = body
      ? this.request[method](endpoint).set(combinedHeaders).send(body)
      : this.request[method](endpoint).set(combinedHeaders);

    const res = await request;
    return new this.responseWrapper(res);
  }

  #logRequest(method, endpoint, combinedHeaders, body) {
    const logMessage = `REQUEST ::
    Method: ${method.toUpperCase()}
    Endpoint: ${endpoint} 
    Headers: ${JSON.stringify(combinedHeaders, null, 2)}
    Body: ${body ? JSON.stringify(body, null, 2) : "-"}`;

    logger.info(logMessage);
  }
}
export default Request;
