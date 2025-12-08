import { expect } from "chai";

export const devToolsUtils = {
  networkResponses: [],
  activeRequests: new Set(),
  consoleLogs: [],

  async enableNetworkMonitoring() {
    this.networkResponses = [];
    this.activeRequests.clear();

    await browser.cdp("Network", "enable");

    browser.on("Network.requestWillBeSent", (params) => {
      this.activeRequests.add(params.requestId);
    });

    browser.on("Network.responseReceived", (params) => {
      this.networkResponses.push({
        url: params.response.url,
        status: params.response.status,
        type: params.type,
      });
      this.activeRequests.delete(params.requestId);
    });
  },

  getNetworkResponses(filter = "") {
    return this.networkResponses.filter((r) => r.url.includes(filter));
  },

  async waitForNetworkIdle(timeout = 3000) {
    await browser.waitUntil(() => this.activeRequests.size === 0, {
      timeout,
      interval: 50,
    });
  },

  async assertNoConsoleErrors() {
    const logs = await browser.getLogs("browser");

    const errors = logs.filter((log) => log.level === "SEVERE" || log.level === "ERROR");

    expect(errors, `Console errors found:\n${JSON.stringify(errors, null, 2)}`).to.be.empty;
  },
};
