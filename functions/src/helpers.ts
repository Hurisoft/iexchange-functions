import { Chance } from "chance";
import { Config } from "./config";

export function randomCode() {
  const code =
    Chance().string({ pool: Config.b58Chars, length: 3 }) +
    "-" +
    Chance().string({ pool: Config.b58Chars, length: 3 });
    return code;
}
