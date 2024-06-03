import { config } from "dotenv";
import path from "path";
import clc from "cli-color";

export function initConfig(env: "DEV" | "PROD") {
  if (env === "DEV") {
    const envPath = path.join(__dirname, `../../.env.development`);
    config({ path: envPath });

    console.log(
      clc.magentaBright(`Current envoirnment -> ` + clc.blue(`development`))
    );
    console.log(
      clc.magentaBright(`Using env file -> ` + clc.blue(`.env.development`))
    );
  } else {
    config();

    console.log(
      clc.magentaBright(`Current envoirnment -> ` + clc.blue(`production`))
    );
    console.log(clc.magentaBright(`Using env file -> ` + clc.blue(`.env`)));
  }
}
