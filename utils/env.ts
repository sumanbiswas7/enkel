import { config } from "dotenv";
import { serverLog } from "../engine/utils/log";

initConfig();

function initConfig() {
  config();
  if (process.env.NODE_ENV === "development") {
    const envPath = `../.env.${process.env.NODE_ENV}`;

    serverLog(`Current envoirnment -> development`, "blue");

    console.log(`Current envoirnment -> development`);
    console.log(`Using env file -> .env.development`);

    config({ path: envPath });
  } else {
    console.log(`Current envoirnment -> production`);
    console.log(`Using env file -> .env`);
  }
}

/**
 * Retrieves the value of an environment variable.
 *
 * This function attempts to retrieve the value of the environment variable specified by the given key.
 * If the environment variable is not defined, it returns the provided alternate value.
 *
 * @param {string} key - The key of the environment variable.
 * @param {(string | number)} alternateValue - The value to return if the environment variable is not defined.
 * @returns {(string | number)} - The value of the environment variable or the alternate value if the environment variable is not defined.
 * @example
 * // Assuming process.env.PORT is set to 3000
 * const port = env("PORT", 8080);
 * console.log(port); // Output: 3000
 */
export function env(
  key: string,
  alternateValue: string | number
): string | number {
  return process.env[key] || alternateValue;
}
