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

export { ColorSystem };
