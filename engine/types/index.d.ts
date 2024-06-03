export interface Config {
  routeMap: {
    show: boolean;
    url: string;
  };
  env: "DEV" | "PROD";
  dev: {
    port: string | number;
    endpointLog: boolean;
    saveLogs: boolean;
  };
  prod: {
    port: string | number;
    endpointLog: boolean;
    saveLogs: boolean;
  };
}
