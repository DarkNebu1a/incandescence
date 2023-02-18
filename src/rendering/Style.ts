/**
 * Represents text decorations. Support for specific decorations is up to the users terminal.
 */
enum Decoration {
  /**
   * No text decoration.
   */
  None = 0,
  /**
   * Bold text.
   */
  Bold = 1,
  /**
   * Dim text. Equivalent to {@link Faint}
   */
  Dim = 2,
  /**
   * Faint text. Equivalent to {@link Dim}
   */
  Faint = Dim,
  /**
   * Italic text.
   */
  Italic = 3,
  /**
   * Underlined text.
   */
  Underline = 4,
}

enum StandardColor {
  Black = 30,
  Red,
  Green,
  Yellow,
  Blue,
  Magenta,
  Cyan,
  White,
  Gray = 90,
  BrightRed,
  BrightGreen,
  BrightYellow,
  BrightBlue,
  BrightMagenta,
  BrightCyan,
  BrightWhite,
}

/**
 * Represents a rgb color.
 */
class Color {
  /**
   * The red component.
   */
  public r: number;
  /**
   * The green component.
   */
  public g: number;
  /**
   * The blue component.
   */
  public b: number;

  /**
   * Initializes a new instance of the {@link Color} class.
   * @param r The red component, which should be from 0 to 255.
   * @param g The green component, which should be from 0 to 255.
   * @param b The blue component, which should be from 0 to 255.
   */
  public constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public static readonly Black = new Color(0, 0, 0);
  public static readonly Red = new Color(170, 0, 0);
  public static readonly Green = new Color(0, 170, 0);
  public static readonly Yellow = new Color(170, 85, 0);
  public static readonly Blue = new Color(0, 0, 170);
  public static readonly Magenta = new Color(170, 0, 170);
  public static readonly Cyan = new Color(0, 170, 170);
  public static readonly White = new Color(170, 170, 170);
  public static readonly Gray = new Color(85, 85, 85);
  public static readonly BrightRed = new Color(0, 85, 85);
  public static readonly BrightGreen = new Color(85, 255, 85);
  public static readonly BrightYellow = new Color(255, 255, 85);
  public static readonly BrightBlue = new Color(85, 85, 255);
  public static readonly BrightMagenta = new Color(255, 85, 0);
  public static readonly BrightCyan = new Color(85, 255, 255);
  public static readonly BrightWhite = new Color(255, 255, 255);

  /**
   * The grayscale variation of the color.
   */
  public get grayscale(): Color {
    // Formula from https://en.wikipedia.org/wiki/Grayscale#Colorimetric_(perceptual_luminance-preserving)_conversion_to_grayscale
    const gray = 0.2126 * (this.r / 255) + 0.7152 * (this.g / 255) + 0.0722 * (this.b / 255);
    const gray32 = Math.round(255 * gray);
    return new Color(gray32, gray32, gray32);
  }

  /**
   * The closest standard 4-bit variation of the color.
   */
  public get closest(): StandardColor {
    return [...STANDARD_PALETTE.entries()].reduce(
      (prev, [standard, color]) => {
        const squareDistance = this.squareDistance(color);
        if (squareDistance < prev.squareDistance) return { standard: standard, squareDistance: squareDistance };
        return prev;
      },
      { standard: StandardColor.Black, squareDistance: Infinity },
    ).standard;
  }

  /**
   * Blends two colors. Providing a factor of 0 will return the current color, whereas a factor of 1 will return {@link other}.
   * @param other The other color.
   * @param factor The blend factor, which should be between 0 and 1.
   */
  public blend(other: Color, factor: number): Color {
    // Formula from https://github.com/Textualize/rich/blob/f092b1d04252e6f6812021c0f415dd1d7be6a16a/rich/color.py#L494
    return new Color(
      Math.round(this.r + (other.r - this.r) * factor),
      Math.round(this.g + (other.g - this.g) * factor),
      Math.round(this.b + (other.b - this.b) * factor),
    );
  }

  /**
   * Calculates the distance between 2 colors.
   * @param other The other color.
   */
  public distance(other: Color): number {
    // Expensive operation
    return Math.sqrt(this.squareDistance(other));
  }

  /**
   * Calculates the square distance between 2 colors.
   * @param other The other color.
   */
  public squareDistance(other: Color): number {
    // Formula from https://stackoverflow.com/a/9085524
    const rmean = (this.r + other.r) / 2;
    const r = this.r - other.r;
    const g = this.g - other.g;
    const b = this.b - other.b;

    // Right shifts are expensive operations?
    return (((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8);
  }

  /**
   * Generates a {@link Color} given a hue, saturation, and value.
   * @param h The hue.
   * @param s The saturation, which should be 0 to 1.
   * @param v The value, which should be 0 to 1.
   */
  public static fromHSV(h: number, s: number, v: number): Color {
    // Formula from https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
    const k = (n: number) => (n + h / 60) % 6;
    const f = (n: number) => v - v * s * Math.max(0, Math.min(k(n), 4 - k(n), 1));

    return new Color(Math.round(f(5) * 255), Math.round(f(3) * 255), Math.round(f(1) * 255));
  }
}

const STANDARD_PALETTE: ReadonlyMap<StandardColor, Color> = new Map([
  [StandardColor.Black, Color.Black],
  [StandardColor.Red, Color.Red],
  [StandardColor.Green, Color.Green],
  [StandardColor.Yellow, Color.Yellow],
  [StandardColor.Blue, Color.Blue],
  [StandardColor.Magenta, Color.Magenta],
  [StandardColor.Cyan, Color.Cyan],
  [StandardColor.White, Color.White],
  [StandardColor.Gray, Color.Gray],
  [StandardColor.BrightRed, Color.BrightRed],
  [StandardColor.BrightGreen, Color.BrightGreen],
  [StandardColor.BrightYellow, Color.BrightYellow],
  [StandardColor.BrightBlue, Color.BrightBlue],
  [StandardColor.BrightMagenta, Color.BrightMagenta],
  [StandardColor.BrightCyan, Color.BrightCyan],
  [StandardColor.BrightWhite, Color.BrightWhite],
]);

export { Decoration, Color };
