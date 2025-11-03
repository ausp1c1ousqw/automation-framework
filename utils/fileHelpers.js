import fs from "fs";
import path from "path";

export function ensureDirExists(dirPath) {
  const fullPath = path.join(process.cwd(), dirPath);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  return fullPath;
}

export function generateFileName(extension = "txt") {
  const now = new Date();
  const pad = (num, len = 2) => String(num).padStart(len, "0");

  const datePart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const timePart = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  const pidPart = `pid_${process.pid}`;

  return `${datePart}_${timePart}${pidPart}.${extension}`;
}

export function createLogFile(logsDirPath = "artifacts/logs") {
  const logsDir = ensureDirExists(logsDirPath);

  const logFile = generateFileName("log");
  const logFilePath = path.join(logsDir, logFile);

  fs.writeFileSync(logFilePath, "", "utf8");

  return logFilePath;
}
