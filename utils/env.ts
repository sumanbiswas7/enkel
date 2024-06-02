import { initConfig } from "../engine/utils/init-env-config";

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

export const ENVIORNMENT: "DEV" | "PROD" = "DEV";
export function env(
  key: string,
  alternateValue: string | number
): string | number {
  initConfig(ENVIORNMENT);
  return process.env[key] || alternateValue;
}
