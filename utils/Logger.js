import fs from "fs";
import { createLogFile } from "./fileHelpers.js";

class Logger {
  constructor({ toConsole = true, toBuffer = true, toFile = true } = {}) {
    this.toConsole = toConsole;
    this.toBuffer = toBuffer;
    this.toFile = toFile;

    this.logFilePath = null;
    this.buffer = [];
  }

  info(message) {
    this.#log("INFO", message);
  }

  warn(message) {
    this.#log("WARN", message);
  }

  error(message) {
    this.#log("ERROR", message);
  }

  getLogs() {
    return this.buffer.join("\n");
  }

  clearLogs() {
    this.buffer = [];
  }

  #log(level, message) {
    const logLine = `${this.#getTimeStamp()}|${process.pid}|${level}|${message}`;
    if (this.toConsole) console.log(logLine);
    if (this.toFile) this.#writetoFile(logLine);
    if (this.toBuffer) this.buffer.push(logLine);
  }

  #writetoFile(message) {
    if (!this.logFilePath) {
      this.logFilePath = createLogFile();
    }
    fs.appendFileSync(this.logFilePath, message + "\n", "utf8");
  }

  #getTimeStamp() {
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
