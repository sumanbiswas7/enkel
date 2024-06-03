export interface Config {
  routeMap: {
    show: boolean;
    url: string;
  };
  env: "DEV" | "PROD";
  dev: {
    port: string | number;
    endpointLog: boolean;
  };
  prod: {
    port: string | number;
    endpointLog: boolean;
  };
}
