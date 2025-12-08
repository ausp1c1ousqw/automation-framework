import { devToolsUtils } from "./devTools.js";

describe("devToolsUtils", () => {
  let mockClient;

  beforeEach(() => {
    devToolsUtils.networkResponses = [];
    devToolsUtils.activeRequests.clear();
    devToolsUtils.consoleLogs = [];

    mockClient = {
      send: jest.fn().mockResolvedValue(null),
      on: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("enableNetworkMonitoring очищает данные и вызывает client.send", async () => {
    await devToolsUtils.enableNetworkMonitoring(mockClient);

    expect(devToolsUtils.networkResponses).toEqual([]);
    expect(devToolsUtils.activeRequests.size).toBe(0);
    expect(mockClient.send).toHaveBeenCalledWith("Network.enable");
    expect(mockClient.send).toHaveBeenCalledWith("Runtime.enable");
    expect(mockClient.on).toHaveBeenCalledTimes(3);
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
    global.browser = { waitUntil: jest.fn().mockResolvedValue(null) };

    await devToolsUtils.waitForNetworkIdle(5000);

    expect(browser.waitUntil).toHaveBeenCalledWith(expect.any(Function), {
      timeout: 5000,
      interval: 50,
    });
  });

  test("Network.requestWillBeSent и responseReceived обновляют состояние", async () => {
    const callbacks = {};
    mockClient.on.mockImplementation((event, cb) => {
      callbacks[event] = cb;
    });

    await devToolsUtils.enableNetworkMonitoring(mockClient);

    callbacks["Network.requestWillBeSent"]({ requestId: "1" });
    expect(devToolsUtils.activeRequests.has("1")).toBe(true);

    callbacks["Network.responseReceived"]({
      requestId: "1",
      response: { url: "https://site.com/api", status: 200 },
      type: "xhr",
    });
    expect(devToolsUtils.activeRequests.has("1")).toBe(false);
    expect(devToolsUtils.networkResponses).toEqual([
      { url: "https://site.com/api", status: 200, type: "xhr" },
    ]);
  });

  test("Runtime.consoleAPICalled сохраняет логи", async () => {
    const callbacks = {};
    mockClient.on.mockImplementation((event, cb) => {
      callbacks[event] = cb;
    });

    await devToolsUtils.enableNetworkMonitoring(mockClient);

    const logMsg = { type: "log", message: "test" };
    callbacks["Runtime.consoleAPICalled"](logMsg);
    expect(devToolsUtils.consoleLogs).toEqual([logMsg]);
  });

  test("assertNoConsoleErrors выбрасывает ошибку при логах с ошибкой", () => {
    devToolsUtils.consoleLogs = [
      { type: "error", message: "boom" },
      { type: "log", message: "ok" },
    ];

    expect(() => devToolsUtils.assertNoConsoleErrors()).toThrow(/Console errors found/);
  });

  test("assertNoConsoleErrors проходит без ошибок, если логов нет", () => {
    devToolsUtils.consoleLogs = [{ type: "log", message: "ok" }];

    expect(() => devToolsUtils.assertNoConsoleErrors()).not.toThrow();
  });
});
