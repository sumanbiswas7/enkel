import express from "express";
import generateRoutes from "./engine";
import enkelConfig from "./enkel.config";

const app = express();
generateRoutes(app);
main();

function main() {
  const PORT =
    enkelConfig.env === "DEV" ? enkelConfig.dev.port : enkelConfig.prod.port;

  app.listen(PORT, () => {
    console.log(`Server is up, http://localhost:${PORT}`);
  });
}
