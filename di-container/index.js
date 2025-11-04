import { getConfig, getLogger } from "./di-container.js";
const config = getConfig();
const logger = getLogger();
export default { config, logger };
