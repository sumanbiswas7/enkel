import { Reset, FgCyan, FgBlue } from "./colors";
import chalk from "chalk";

type Color = "blue" | "red";
export function serverLog(text: string, color: Color) {
  let logColString = Reset;

  console.log(chalk.blue("Hello world!"));

  if (color === "blue") logColString = FgBlue;

  console.log(logColString, "🟡 " + text);

  console.log(Reset, "");
}
