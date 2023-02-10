import { execSync } from "node:child_process";
import process from "node:process";
import os from "node:os";
import { ColorSystem } from "./ColorSystem";
import { SystemSupport } from "./SystemSupport";

class Windows {
  public static detectANSISystem(): SystemSupport.Supported | SystemSupport.NotSupported {
    const version = Windows.parseReleaseVersion();
    if (version.major >= 10 && version.build >= 14393) return SystemSupport.Supported;

    if (Windows.isMinGW()) return SystemSupport.Supported;

    const conEmuANSI = process.env["ConEmuANSI"];
    if (conEmuANSI && conEmuANSI.toLowerCase() === "on") return SystemSupport.Supported;

    return process.env["ANSICON"] ? SystemSupport.Supported : SystemSupport.NotSupported;
  }

  public static detectColorSystem(ansi: boolean): Exclude<ColorSystem, ColorSystem.Detect> {
    if (!ansi) return ColorSystem.EightBit;

    const version = Windows.parseReleaseVersion();
    if (version.major >= 10 && version.build >= 10_586)
      return version.build >= 14_931 ? ColorSystem.TrueColor : ColorSystem.EightBit;
    return ColorSystem.Standard;
  }

  public static parseReleaseVersion(): { major: number; build: number } {
    const osRelease = os.release().split(".");
    return {
      major: Number.parseInt(osRelease[0] ?? "", 10),
      build: Number.parseInt(osRelease[2] ?? "", 10),
    };
  }

  private static isMinGW(): boolean {
    try {
      return execSync("uname", { encoding: "utf-8" }).toLowerCase().includes("mingw");
    } catch (err) {
      return false;
    }
  }
}

export { Windows };
