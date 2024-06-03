import { APIResponse } from "../models/http-response";

export function errorHandler(err, req, res, next) {
  // Handle the error here
  const data = res.data || res || null;
  const message = err.message || "Internal Server Error";

  const response = new APIResponse(false, data, err.status || 500, message);

  res.json(response);
}
