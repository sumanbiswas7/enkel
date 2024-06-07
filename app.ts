import express from "express";
import generateRoutes from "./engine";
import enkelConfig from "./enkel.config";
import { interceptResponseJson } from "./middlewares/http-res";
import { errorHandler } from "./middlewares/err-handler";
import clc from "cli-color";
import cors from "cors";

const app = express();
console.log(clc.blackBright(`=============================================`));

// MIDDLEWARES
app.use(cors({ origin: "*" }));
app.use(errorHandler);
app.use(interceptResponseJson);
app.use(express.static(__dirname + "/public"));

generateRoutes(app);
main();

function main() {
  const PORT =
    enkelConfig.env === "DEV" ? enkelConfig.dev.port : enkelConfig.prod.port;

  app.listen(PORT, () => {
    console.log(
      clc.yellowBright(`🚀 Server is running at `) +
        clc.cyan.underline(`http://localhost:${PORT}`)
    );
  });
}
