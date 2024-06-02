import { config } from "dotenv";
import path from "path";

export function initConfig(env: "DEV" | "PROD") {
  if (env === "DEV") {
    const envPath = path.join(__dirname, `../../.env.development`);
    config({ path: envPath });

    console.log(`Current envoirnment -> development`);
    console.log(`Using env file -> .env.development`);
  } else {
    config();

    console.log(`Current envoirnment -> production`);
    console.log(`Using env file -> .env`);
  }
}
