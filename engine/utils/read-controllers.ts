import fs from "fs";
import path from "path";

/**
 * Recursively read directories and return all file paths.
 * @param {string} dir - The directory to read.
 * @returns {string[]} - An array of file paths.
 */
export default function readControllers(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(readControllers(filePath));
    } else {
      results.push(filePath);
    }
  });

  return results;
}
