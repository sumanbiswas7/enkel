import { Reset, FgCyan, FgBlue } from "./colors";

type Color = "blue" | "red";
export function serverLog(text: string, color: Color) {
  let logColString = Reset;

  if (color === "blue") logColString = FgBlue;

  console.log(logColString, "🟡 " + text);

  console.log(Reset, "");
}
