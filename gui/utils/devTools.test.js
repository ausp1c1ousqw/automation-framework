import { devToolsUtils } from "./devTools.js";

describe("devToolsUtils", () => {
  let mockBrowser;

  beforeEach(() => {
    devToolsUtils.networkResponses = [];
    devToolsUtils.activeRequests.clear();
    devToolsUtils.consoleLogs = [];

    mockBrowser = {
      cdp: jest.fn().mockResolvedValue(null),
      on: jest.fn(),
      waitUntil: jest.fn().mockResolvedValue(null),
      getLogs: jest.fn(),
    };

    global.browser = mockBrowser;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("enableNetworkMonitoring очищает данные и вызывает browser.cdp", async () => {
    await devToolsUtils.enableNetworkMonitoring();

    expect(devToolsUtils.networkResponses).toEqual([]);
    expect(devToolsUtils.activeRequests.size).toBe(0);
    expect(mockBrowser.cdp).toHaveBeenCalledWith("Network", "enable");
    expect(mockBrowser.on).toHaveBeenCalledTimes(2); // для request и response
  });

  test("getNetworkResponses фильтрует по URL", () => {
    devToolsUtils.networkResponses = [
      { url: "https://site.com/api", status: 200, type: "xhr" },
      { url: "https://site.com/img", status: 200, type: "image" },
    ];

    const filtered = devToolsUtils.getNetworkResponses("api");
    expect(filtered).toEqual([{ url: "https://site.com/api", status: 200, type: "xhr" }]);
  });

  test("waitForNetworkIdle вызывает browser.waitUntil", async () => {
    await devToolsUtils.waitForNetworkIdle(5000);
    expect(mockBrowser.waitUntil).toHaveBeenCalledWith(expect.any(Function), {
      timeout: 5000,
      interval: 50,
    });
  });

  test("Network.requestWillBeSent и responseReceived работают корректно", async () => {
    const requestCallbacks = {};
    mockBrowser.on.mockImplementation((event, cb) => {
      requestCallbacks[event] = cb;
    });

    await devToolsUtils.enableNetworkMonitoring();

    requestCallbacks["Network.requestWillBeSent"]({ requestId: "1" });
    expect(devToolsUtils.activeRequests.has("1")).toBe(true);

    requestCallbacks["Network.responseReceived"]({
      requestId: "1",
      response: { url: "https://site.com/api", status: 200 },
      type: "xhr",
    });
    expect(devToolsUtils.activeRequests.has("1")).toBe(false);
    expect(devToolsUtils.networkResponses).toEqual([
      { url: "https://site.com/api", status: 200, type: "xhr" },
    ]);
  });

  test("assertNoConsoleErrors fails when ERROR or SEVERE logs exist", async () => {
    browser.getLogs.mockResolvedValue([{ level: "ERROR", message: "boom" }]);

    await expect(devToolsUtils.assertNoConsoleErrors()).rejects.toThrow("boom");
  });
});
