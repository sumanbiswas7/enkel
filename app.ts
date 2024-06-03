import express from "express";
import generateRoutes from "./engine";
import enkelConfig from "./enkel.config";
import { interceptResponseJson } from "./middlewares/http-res";
import { errorHandler } from "./middlewares/err-handler";

const app = express();
app.use(errorHandler);
app.use(interceptResponseJson);

generateRoutes(app);
main();

function main() {
  const PORT =
    enkelConfig.env === "DEV" ? enkelConfig.dev.port : enkelConfig.prod.port;

  app.listen(PORT, () => {
    console.log(`Server is up, http://localhost:${PORT}`);
  });
}
