import express from "express";
import generateRoutes from "./engine";
import { config } from "dotenv";
import enkelConfig from "./enkel.config";
config();

const app = express();
generateRoutes(app);

const PORT =
  process.env.NODE_ENV === "development"
    ? enkelConfig.dev.port
    : enkelConfig.prod.port;

app.listen(PORT, () => {
  console.log(`Server is up, http://localhost:${PORT}`);
});

export const ok = { ok: "as" };
