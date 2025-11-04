import { config, logger } from "../../di-container";

export async function waitForDocumentReadyState(timeout) {
  const effectiveTimeout = timeout ?? config.timeouts.medium;

  logger.info("Waiting for the page to be fully loaded");

  await browser.waitUntil(
    async () => (await browser.execute(() => document.readyState)) === "complete",
    { timeout: effectiveTimeout }
  );
}

export async function navigateTo(path) {
  logger.info(`Build full URL from path: ${path}`);
  const fullUrl = buildUrl(path);

  logger.info(`Navigate to: "${fullUrl}"`);
  await browser.url(fullUrl);
}

function buildUrl(path) {
  const url = path.startsWith("http") ? path : new URL(path, config.baseUrl).toString();
  return url;
}
