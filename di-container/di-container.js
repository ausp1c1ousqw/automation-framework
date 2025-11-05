export let config = null;
export let logger = null;

export function setConfig(c) {
  config = c;
  console.log(config);
}

export function getConfig() {
  console.log(config);
  return config;
}

export function setLogger(l) {
  logger = l;
  console.log(logger);
}

export function getLogger() {
  console.log(logger);
  return logger;
}
