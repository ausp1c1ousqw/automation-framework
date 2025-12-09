import { expect } from "chai";

export async function getPuppeteerPage() {
  // В WDIO v9 browser.getPuppeteer() возвращает Puppeteer Page через BiDi
  return await browser.getPuppeteer();
}

export const devToolsUtils = {
  networkResponses: [],
  activeRequests: new Set(),
  consoleLogs: [],

  async enableNetworkMonitoring(page) {
    await browser.url("https://magento2demo.firebearstudio.com/");
    const puppeteerPage = await browser.getPuppeteer();

    this.networkResponses = [];
    this.activeRequests.clear();
    this.consoleLogs = [];

    // Сетевые события
    puppeteerPage.on("request", (request) => {
      this.activeRequests.add(request._requestId || request.url());
    });

    puppeteerPage.on("response", async (response) => {
      const requestId = response._requestId || response.url();
      this.activeRequests.delete(requestId);

      const url = response.url();
      const status = response.status();
      const type = response.request().resourceType();

      this.networkResponses.push({ url, status, type });
    });

    // Логи консоли
    puppeteerPage.on("console", (msg) => {
      this.consoleLogs.push(msg);
    });

    return puppeteerPage;
  },

  getNetworkResponses(filter = "") {
    return this.networkResponses.filter((r) => r.url.includes(filter));
  },

  async waitForNetworkIdle(timeout = 3000) {
    const start = Date.now();
    while (this.activeRequests.size > 0 && Date.now() - start < timeout) {
      await new Promise((r) => setTimeout(r, 50));
    }
  },

  assertNoConsoleErrors() {
    const errors = this.consoleLogs.filter(
      (log) => log.type?.toLowerCase() === "error" || log.level?.toLowerCase() === "error"
    );

    if (errors.length > 0) {
      throw new Error(`Console errors found:\n${JSON.stringify(errors, null, 2)}`);
    }
  },

  async getPerformanceMetricsMs(page) {
    const puppeteerPage = page || (await getPuppeteerPage());
    const perf = await puppeteerPage.metrics(); // Puppeteer BiDi metrics
    const metrics = {};
    for (const [key, value] of Object.entries(perf)) {
      metrics[key] = value * 1000; // перевод в миллисекунды
    }
    return metrics;
  },

  async checkFirstMeaningfulPaint(page) {
    const metrics = await this.getPerformanceMetricsMs(page);
    expect(metrics.FirstMeaningfulPaint).to.be.lessThan(2000);
  },
};
