export interface Config {
  routeMap: {
    show: boolean;
    url: string;
  };
  env: "DEV" | "PROD";
  dev: {
    port: string | number;
  };
  prod: {
    port: string | number;
  };
}
