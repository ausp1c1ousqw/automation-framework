export let config = null;
export let logger = null;

export function setConfig(c) {
  config = c;
  console.log(config);
}

export function getConfig() {
  return config;
}

export function setLogger(l) {
  logger = l;
}

export function getLogger() {
  return logger;
}
