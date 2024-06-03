import { APIResponse } from "../models/http-response";
import clc from "cli-color";
import { ENVIORNMENT } from "../utils/env";
import enkelConfig from "../enkel.config";
import path from "path";
import fs from "fs";

export function interceptResponseJson(req, res: any, next) {
  const originalJson = res.json;

  // LOG ENDPOINT HITS
  if (ENVIORNMENT === "DEV" && enkelConfig.dev.endpointLog === true) {
    logEndpointHit(req);
  }
  if (ENVIORNMENT === "PROD" && enkelConfig.prod.endpointLog === true) {
    logEndpointHit(req);
  }

  // SAVE LOGS
  if (ENVIORNMENT === "DEV" && enkelConfig.dev.saveLogs === true) {
    saveLog(req);
  }
  if (ENVIORNMENT === "PROD" && enkelConfig.prod.saveLogs === true) {
    saveLog(req);
  }

  // Override the json function
  res.json = function (body) {
    if (body.isError === true) {
      const data = body.data || null;
      const message = body.message || undefined;
      const success = false;
      const status = body.status;

      const ModifybodyJson = new APIResponse(success, data, status, message);
      originalJson.call(this, ModifybodyJson);
    } else {
      const data = body.data || body;
      const message = body.message || undefined;
      const success = res.statusCode >= 200 && res.statusCode < 300;
      const status = res.statusCode;

      const ModifybodyJson = new APIResponse(success, data, status, message);
      originalJson.call(this, ModifybodyJson);
    }
  };

  next();
}

/**
 * ======================
 * ===== LOG UTILS ======
 * ======================
 */

function formatLogDate(date: Date, onlyDay?: boolean) {
  const padZero = (num) => num.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // Months are zero-based
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  if (onlyDay) return `${year}-${month}-${day}`;
  return `${year}-${month}-${day}:${hours}:${minutes}:${seconds}`;
}

function logEndpointHit(req: any) {
  if (!req.originalUrl || !req.method) return;

  const logUrl =
    req.method + " " + formatLogDate(new Date()) + " -> " + req.originalUrl;
  console.log(clc.blueBright(logUrl));
}

function saveLog(req: any) {
  const logUrl =
    req.method + " " + formatLogDate(new Date()) + " -> " + req.originalUrl;

  // Define the log directory and file path
  const logDir = path.join(__dirname, "../../logs");
  const logFilePath = path.join(
    logDir,
    `${formatLogDate(new Date(), true)}.json`
  );

  // Ensure the log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // Read the existing logs from the file (if any)
  let logs = [];
  if (fs.existsSync(logFilePath)) {
    const fileContent = fs.readFileSync(logFilePath, "utf-8");
    logs = JSON.parse(fileContent);
  }

  // Add the new log entry
  logs.push(logUrl);

  // Save the updated logs back to the file
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
}
