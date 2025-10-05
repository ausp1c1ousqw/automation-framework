import fs from "fs";
import path from "path";
import * as utils from "./utils.js";

class Logger {
  constructor(debugDir) {
    this.logsDir = path.join(debugDir, "/logs");
    utils.ensureDirExists(this.logsDir);

    const logFileName = utils.generateFileName(`_pid_${process.pid}`, "log");
    this.logFilePath = path.join(this.logsDir, logFileName);

    this.logUncaughtException();
  }

  logUncaughtException() {
    process.on("uncaughtException", (err) => {
      this.error(`Uncaught Exception: ${err.stack || err.message}`);
    });

    process.on("unhandledRejection", (reason) => {
      this.error(`Unhandled Rejection: ${reason?.stack || reason}`);
    });
  }

  info(message) {
    this.log("INFO", message);
  }

  warn(message) {
    this.log("WARN", message);
  }

  error(message) {
    this.log("ERROR", message);
  }

  log(level, message) {
    const logLine = `${this.getTimeStamp()}|${process.pid}|${level}|${message}`;
    console.log(logLine);
    this.writeToFile(logLine);
  }

  writeToFile(message) {
    fs.appendFileSync(this.logFilePath, message + "\n", "utf8");
  }

  getTimeStamp() {
    const now = new Date();
    const pad = (num, len = 2) => String(num).padStart(len, "0");
    const dateParts = {
      year: now.getFullYear(),
      month: pad(now.getMonth() + 1),
      day: pad(now.getDate()),
      hours: pad(now.getHours()),
      minutes: pad(now.getMinutes()),
      seconds: pad(now.getSeconds()),
      milliseconds: pad(now.getMilliseconds(), 4),
    };
    const { year, month, day, hours, minutes, seconds, milliseconds } = dateParts;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
}
export default Logger;
