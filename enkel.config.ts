import { ENVIORNMENT, env } from "./utils/env";
import { Config } from "./engine/types";

const config: Config = {
  routeMap: {
    show: true,
    url: "_routes_",
  },
  env: ENVIORNMENT,
  dev: {
    port: env("PORT", 4000),
    endpointLog: true,
  },
  prod: {
    port: env("PORT", 5000),
    endpointLog: true,
  },
};

export default config;
