import * as process from "node:process";
import { Windows } from "./Windows";
import { SystemSupport } from "./SystemSupport";

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

export { ANSIDetector };
