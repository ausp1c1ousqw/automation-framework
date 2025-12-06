import fs from "fs";
import path from "path";
import { config } from "automation-framework/di-container";

export function ensureDirExists(dirPath) {
  const fullPath = path.join(process.cwd(), dirPath);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  return fullPath;
}

export function generateTimestampedFileName(extension = "txt") {
  const now = new Date();
  const pad = (num, len = 2) => String(num).padStart(len, "0");

  const datePart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const timePart = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  const pidPart = `pid_${process.pid}`;

  return `${datePart}_${timePart}${pidPart}.${extension}`;
}

export function createLogFile() {
  const logsDir = ensureDirExists(`${config.debugDir}/logs`);

  const logFile = generateTimestampedFileName("log");
  const logFilePath = path.join(logsDir, logFile);

  fs.writeFileSync(logFilePath, "", "utf8");

  return logFilePath;
}

export function createAllureEnvFile(envObject) {
  const allureResultsDir = ensureDirExists(`${config.debugDir}/allure-results`);
  const envFilePath = path.join(allureResultsDir, "environment.properties");
  const envProps = Object.entries(envObject)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  fs.writeFileSync(envFilePath, envProps);
}
