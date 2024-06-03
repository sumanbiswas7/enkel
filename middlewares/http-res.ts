import { APIResponse } from "../models/http-response";

export function interceptResponseJson(req, res: any, next) {
  const originalJson = res.json;

  // Override the json function
  res.json = function (body) {
    // Modify the response body

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
