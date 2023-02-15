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
  Bold = 1 << 0,
  /**
   * Dim text. Equivalent to {@link Faint}
   */
  Dim = 1 << 1,
  /**
   * Faint text. Equivalent to {@link Dim}
   */
  Faint = Dim,
  /**
   * Italic text.
   */
  Italic = 1 << 2,
  /**
   * Underlined text.
   */
  Underline = 1 << 3,
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
   * Blends two colors. Providing a factor of 0 will return the current color, whereas a factor of 1 will return {@link other}.
   * @param other The other color.
   * @param factor The blend factor, which should be between 0 and 1.
   */
  public blend(other: Color, factor: number) {
    // Formula from https://github.com/Textualize/rich/blob/f092b1d04252e6f6812021c0f415dd1d7be6a16a/rich/color.py#L494
    return new Color(
      Math.round(this.r + (other.r - this.r) * factor),
      Math.round(this.g + (other.g - this.g) * factor),
      Math.round(this.b + (other.b - this.b) * factor),
    );
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

export { Decoration, Color };
