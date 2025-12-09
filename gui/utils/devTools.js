export async function getPuppeteerClient() {
  const puppeteerPage = await browser.getPuppeteer();
  return await puppeteerPage.target().createCDPSession();
}

export const devToolsUtils = {
  networkResponses: [],
  activeRequests: new Set(),
  consoleLogs: [],

  async enableNetworkMonitoring(client) {
    this.networkResponses = [];
    this.activeRequests.clear();

    const cdpClient = client || (await getPuppeteerClient());

    await cdpClient.send("Network.enable");
    await cdpClient.send("Runtime.enable");

    cdpClient.on("Network.requestWillBeSent", (params) => {
      this.activeRequests.add(params.requestId);
    });

    cdpClient.on("Network.responseReceived", (params) => {
      this.networkResponses.push({
        url: params.response.url,
        status: params.response.status,
        type: params.type,
      });
      this.activeRequests.delete(params.requestId);
    });

    cdpClient.on("Runtime.consoleAPICalled", (msg) => {
      this.consoleLogs.push(msg);
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

  assertNoConsoleErrors() {
    const errors = this.consoleLogs.filter(
      (log) => log.type?.toLowerCase() === "error" || log.level?.toLowerCase() === "error"
    );
    if (errors.length > 0) {
      throw new Error(`Console errors found:\n${JSON.stringify(errors, null, 2)}`);
    }
  },

  async getPerformanceMetricsMs(client) {
    const cdpClient = client || (await getPuppeteerClient());
    const perfMetrics = await cdpClient.send("Performance.getMetrics");

    const metrics = {};
    for (const item of perfMetrics.metrics) {
      metrics[item.name] = item.value * 1000;
    }

    return metrics;
  },

  async checkFirstMeaningfulPaint() {
    const metrics = await this.getPerformanceMetricsMs();

    expect(metrics.FirstMeaningfulPaint).to.be.lessThan(2000);
  },
};
