import { DevToolsUtils } from "./devTools.js";

describe("DevToolsUtils", () => {
  let mockBrowser;

  beforeEach(() => {
    // Сброс состояния перед каждым тестом
    DevToolsUtils.networkResponses = [];
    DevToolsUtils.activeRequests.clear();
    DevToolsUtils.consoleLogs = [];

    // Мок browser
    mockBrowser = {
      cdp: jest.fn().mockResolvedValue(null),
      on: jest.fn(),
      waitUntil: jest.fn().mockResolvedValue(null),
    };

    global.browser = mockBrowser;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("enableNetworkMonitoring очищает данные и вызывает browser.cdp", async () => {
    await DevToolsUtils.enableNetworkMonitoring();

    expect(DevToolsUtils.networkResponses).toEqual([]);
    expect(DevToolsUtils.activeRequests.size).toBe(0);
    expect(mockBrowser.cdp).toHaveBeenCalledWith("Network", "enable");
    expect(mockBrowser.on).toHaveBeenCalledTimes(2); // для request и response
  });

  test("getNetworkResponses фильтрует по URL", () => {
    DevToolsUtils.networkResponses = [
      { url: "https://site.com/api", status: 200, type: "xhr" },
      { url: "https://site.com/img", status: 200, type: "image" },
    ];

    const filtered = DevToolsUtils.getNetworkResponses("api");
    expect(filtered).toEqual([{ url: "https://site.com/api", status: 200, type: "xhr" }]);
  });

  test("waitForNetworkIdle вызывает browser.waitUntil", async () => {
    await DevToolsUtils.waitForNetworkIdle(5000);
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

    await DevToolsUtils.enableNetworkMonitoring();

    // эмулируем отправку запроса
    requestCallbacks["Network.requestWillBeSent"]({ requestId: "1" });
    expect(DevToolsUtils.activeRequests.has("1")).toBe(true);

    // эмулируем получение ответа
    requestCallbacks["Network.responseReceived"]({
      requestId: "1",
      response: { url: "https://site.com/api", status: 200 },
      type: "xhr",
    });
    expect(DevToolsUtils.activeRequests.has("1")).toBe(false);
    expect(DevToolsUtils.networkResponses).toEqual([
      { url: "https://site.com/api", status: 200, type: "xhr" },
    ]);
  });
});
