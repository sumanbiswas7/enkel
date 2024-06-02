import { env } from "./utils/env";
import { Config } from "./engine/types";

const config: Config = {
  routeMap: {
    show: true,
    url: "_routes_",
  },
  env: "DEV",
  dev: {
    port: env("PORT", 4001),
  },
  prod: {
    port: env("PORT", 5001),
  },
};

export default config;
