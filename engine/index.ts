import { Express } from "express";
import enkelConfig from "../enkel.config";
import readControllers from "./utils/read-controllers";
import path from "path";

const HTTP_METHODS = ["get", "post", "put", "delete", "patch"];

export default function generateRoutes(app: Express) {
  // Read all controllers from the ../controllers directory
  const controllersPath = path.join(__dirname, "../controllers");
  const controllerFiles = readControllers(controllersPath);
  const routes = [];

  // Dynamically set up routes
  controllerFiles.forEach((file) => {
    const relativePath = path.relative(controllersPath, file);
    const fileName = path.basename(file);
    const fileWithoutExtension = fileName.replace(/\.[jt]s$/, ""); // Remove .js or .ts extension

    let routePath =
      "/" +
      relativePath
        .replace(/\\/g, "/") // Replace backslashes with forward slashes
        .replace(/\[(.+?)\]/g, ":$1") // Replace [anything] with :anything for dynamic routes
        .replace(/\/[^\/]+$/, ""); // Remove the file name part

    // Determine the HTTP method from the file name
    const method =
      HTTP_METHODS.find(
        (method) => method === fileWithoutExtension.toLowerCase()
      ) || "get";

    let controller = require(file);
    if (!controller.default) {
      throw new Error(`File: ${file} expects a export default function`);
    } else {
      controller = controller.default;
    }

    if (typeof controller === "function") {
      app[method](routePath, controller);
    }

    const newRouteObj = {
      method,
      route: routePath,
      controller: relativePath,
    };

    routes.push(newRouteObj);
  });

  if (enkelConfig["routeMap"]["show"] === true) {
    app.get(`/${enkelConfig["routeMap"]["url"]}`, (_, res) => res.json(routes));
  }
}
