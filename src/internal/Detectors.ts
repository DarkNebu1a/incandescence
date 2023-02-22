import type { WriteStream } from "node:tty";
import { Windows } from "./Windows";

/**
 * Represents a color system.
 */
const enum ColorSystem {
  /**
   * Try to detect the color system.
   */
  Detect = -1,
  /**
   * No colors.
   */
  NoColors = 0,

  /**
   * Standard, 4-bit mode.
   */
  Standard = 1,

  /**
   * 8-bit mode.
   */
  EightBit = 2,

  /**
   * 24-bit mode.
   */
  TrueColor = 3,
}

/**
 * Represents whether a system is supported.
 */
const enum SystemSupport {
  /**
   * Try and detect the system.
   */
  Detect = -1,
  /**
   * System is supported.
   */
  Supported = 0,
  /**
   * System is not supported.
   */
  NotSupported = 1,
}

/**
 * Utility for detecting color support in the terminal.
 */
class ColorDetector {
  private static readonly DEFAULT: Exclude<ColorSystem, ColorSystem.Detect> = ColorSystem.NoColors;
  private static readonly TEAMCITY_VERSION_PATTERN: RegExp = /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/;
  private static readonly TERMINAL_EIGHT_BIT_PATTERN: RegExp = /-256(color)?$/i;
  private static readonly TERMINAL_STANDARD_PATTERNS: Array<RegExp> = [
    /^xterm/, // xterm, PuTTY, Mintty
    /^rxvt/, // RXVT
    /^screen/, // GNU screen, tmux
    /^vt100/, // DEC VT series
    /^vt220/, // DEC VT series
    /color/, // ???
    /ansi/, // ANSI
    /cygwi/, // Cygwin, MinGW
    /linux/, // Linux console
  ];
  private static readonly CI_VARIABLES: Array<string> = [
    "TRAVIS",
    "CIRCLECI",
    "APPVEYOR",
    "GITLAB_CI",
    "BUILDKITE",
    "DRONE",
  ];

  /**
   * Detects what colors the os can display in the terminal.
   * @param ansi Whether the terminal can display ANSI characters.
   * @returns The highest supportable color system.
   */
  public static detect(ansi: boolean): Exclude<ColorSystem, ColorSystem.Detect> {
    if (!process.stdout.isTTY || process.env["NO_COLOR"]) return ColorSystem.NoColors;

    if (process.platform === "win32") return Windows.detectColorSystem(ansi);

    if (process.env["CI"]) return ColorDetector.detectFromGitLab();

    const teamcityVersion = process.env["TEAMCITY_VERSION"];
    if (teamcityVersion) {
      return ColorDetector.TEAMCITY_VERSION_PATTERN.test(teamcityVersion) ? ColorSystem.Standard : ColorSystem.NoColors;
    }

    return ColorDetector.detectFromTerminal();
  }

  private static detectFromGitLab(): Exclude<ColorSystem, ColorSystem.Detect> {
    if (process.env["GITHUB_ACTIONS"]) return ColorSystem.TrueColor;

    if (ColorDetector.CI_VARIABLES.some((variable) => process.env[variable])) return ColorSystem.Standard;
    if (process.env["CI_NAME"] === "codeship") return ColorSystem.Standard;

    return ColorDetector.DEFAULT;
  }

  private static detectFromTerminal(): Exclude<ColorSystem, ColorSystem.Detect> {
    const terminalProgram = process.env["TERM_PROGRAM"];
    if (terminalProgram) {
      const version = Number.parseInt((process.env["TERM_PROGRAM_VERSION"] ?? "").split(".")[0] ?? "", 10);

      switch (terminalProgram) {
        case "iTerm.app":
          return version >= 3 ? ColorSystem.TrueColor : ColorSystem.EightBit;
        case "Apple_Terminal":
          return ColorSystem.EightBit;
      }
    }

    const terminal = process.env["TERM"];
    if (terminal) {
      if (terminal === "xterm-kitty") return ColorSystem.TrueColor;
      if (ColorDetector.TERMINAL_EIGHT_BIT_PATTERN.test(terminal)) return ColorSystem.EightBit;
      if (ColorDetector.TERMINAL_STANDARD_PATTERNS.some((pattern) => pattern.test(terminal)))
        return ColorSystem.Standard;
    }

    if (process.env["TF_BUILD"] && process.env["AGENT_NAME"]) return ColorSystem.Standard;

    const colorTerminal = process.env["COLORTERM"];
    if (!colorTerminal) return ColorDetector.DEFAULT;
    if (colorTerminal.toLowerCase() === "truecolor" || colorTerminal.toLowerCase() === "24bit")
      return ColorSystem.TrueColor;

    return ColorDetector.DEFAULT;
  }
}

/**
 * Utility for detecting ANSI support in the terminal.
 */
class ANSIDetector {
  private static readonly TERMINAL_PATTERNS: Array<RegExp> = [
    /^xterm/, // xterm, PuTTY, Mintty
    /^rxvt/, // RXVT
    /^eterm/, // Eterm
    /^screen/, // GNU screen, tmux
    /tmux/, // tmux
    /^vt100/, // DEC VT series
    /^vt102/, // DEC VT series
    /^vt220/, // DEC VT series
    /^vt320/, // DEC VT series
    /ansi/, // ANSI
    /scoansi/, // SCO ANSI
    /cygwin/, // Cygwin, MinGW
    /linux/, // Linux console
    /konsole/, // Konsole
    /bvterm/, // Bitvise SSH Client
    /^st-256color/, // Suckless Simple Terminal, st
  ];

  /**
   * Detects whether ANSI can be displayed in the terminal.
   * @returns Whether ANSI is supported in the terminal.
   */
  public static detect(): SystemSupport.Supported | SystemSupport.NotSupported {
    if (!process.stdout.isTTY) return SystemSupport.NotSupported;
    return process.platform === "win32" ? Windows.detectANSISystem() : ANSIDetector.detectFromTerminal();
  }

  private static detectFromTerminal(): SystemSupport.Supported | SystemSupport.NotSupported {
    const terminal = process.env["TERM"];
    if (!terminal) return SystemSupport.NotSupported;

    return ANSIDetector.TERMINAL_PATTERNS.some((pattern: RegExp) => pattern.test(terminal))
      ? SystemSupport.Supported
      : SystemSupport.NotSupported;
  }
}

/**
 * Utility for detecting interactivity support in the terminal.
 */
class InteractionDetector {
  /**
   * Detects whether the terminal is interactive.
   * @param stream The output stream. This defaults to {@link process.stdout}
   * @returns Whether interactivity is supported in the terminal.
   */
  public static detect(stream: WriteStream = process.stdout): SystemSupport.Supported | SystemSupport.NotSupported {
    if (!stream.isTTY) return SystemSupport.NotSupported;
    if (process.env["CI"]) return SystemSupport.NotSupported;
    if (process.env["TERM"] === "dumb") return SystemSupport.NotSupported;

    return SystemSupport.Supported;
  }
}

export { ColorDetector, ANSIDetector, InteractionDetector, ColorSystem, SystemSupport };
