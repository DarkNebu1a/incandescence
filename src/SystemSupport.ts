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

export { SystemSupport };
