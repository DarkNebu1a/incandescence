import { SystemSupport } from "./SystemSupport";
import type { WriteStream } from "tty";

/**
 *
 */
class InteractionDetector {
  /**
   *
   * @param stream
   * @returns
   */
  public static detect(stream: WriteStream): SystemSupport.Supported | SystemSupport.NotSupported {
    if (!stream.isTTY) return SystemSupport.NotSupported;
    if (process.env["CI"]) return SystemSupport.NotSupported;
    if (process.env["TERM"] === "dumb") return SystemSupport.NotSupported;

    return SystemSupport.Supported;
  }
}

export { InteractionDetector };
