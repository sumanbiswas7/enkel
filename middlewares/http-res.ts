import { APIResponse } from "../models/http-response";
import clc from "cli-color";
import { ENVIORNMENT } from "../utils/env";
import enkelConfig from "../enkel.config";

export function interceptResponseJson(req, res: any, next) {
  const originalJson = res.json;

  // LOG ENDPOINT HITS
  if (ENVIORNMENT === "DEV" && enkelConfig.dev.endpointLog === true) {
    logEndpointHit(req);
  }
  if (ENVIORNMENT === "PROD" && enkelConfig.prod.endpointLog === true) {
    logEndpointHit(req);
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

function formatLogDate(date) {
  const padZero = (num) => num.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // Months are zero-based
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day}:${hours}:${minutes}:${seconds}`;
}

function logEndpointHit(req: any) {
  if (!req.originalUrl || !req.method) return;

  const loggableUrl =
    req.method + " " + formatLogDate(new Date()) + " -> " + req.originalUrl;
  console.log(clc.blueBright(loggableUrl));
}
