import { AsciiBorder, DoubleBorder, HeavyBorder, NoBorder, RoundedBorder, SquareBorder } from "./Borders";

enum BorderPart {
  Top,
  Bottom,
  Left,
  Right,
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}

abstract class Border {
  public abstract getPart(part: BorderPart): string;

  public static readonly None: Border = new NoBorder();
  public static readonly Ascii: Border = new AsciiBorder();
  public static readonly Double: Border = new DoubleBorder();
  public static readonly Heavy: Border = new HeavyBorder();
  public static readonly Rounded: Border = new RoundedBorder();
  public static readonly Square: Border = new SquareBorder();
}

export { BorderPart, Border }