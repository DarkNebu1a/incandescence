/**
 *
 */
enum BorderPart {
  /**
   *
   */
  Top,

  /**
   *
   */
  Bottom,

  /**
   *
   */
  Left,

  /**
   *
   */
  Right,

  /**
   *
   */
  TopLeft,

  /**
   *
   */
  TopRight,

  /**
   *
   */
  BottomLeft,

  /**
   *
   */
  BottomRight,
}

/**
 *
 */
abstract class Border {
  /**
   *
   * @param part
   */
  public abstract getPart(part: BorderPart): string;

  /**
   *
   */
  public static readonly None: Border = new class extends Border {
    getPart(_part: BorderPart): string {
      return " ";
    }
  }();

  /**
   *
   */
  public static readonly Ascii: Border = new class extends Border {
    getPart(part: BorderPart): string {
      switch (part) {
        case BorderPart.Top:
        case BorderPart.Bottom: return "-";
        case BorderPart.Left:
        case BorderPart.Right: return "|";
        case BorderPart.TopLeft:
        case BorderPart.TopRight:
        case BorderPart.BottomLeft:
        case BorderPart.BottomRight: return "+";
      }
    }
  }();

  /**
   *
   */
  public static readonly Double: Border = new class extends Border {
    getPart(part: BorderPart): string {
      switch (part) {
        case BorderPart.Top:
        case BorderPart.Bottom: return "═";
        case BorderPart.Left:
        case BorderPart.Right: return "║";
        case BorderPart.TopLeft: return "╔";
        case BorderPart.TopRight: return "╗";
        case BorderPart.BottomLeft: return "╚";
        case BorderPart.BottomRight: return "╝";
      }
    }
  }();

  /**
   *
   */
  public static readonly Heavy: Border = new class extends Border {
    getPart(part: BorderPart): string {
      switch (part) {
        case BorderPart.Top:
        case BorderPart.Bottom: return "━";
        case BorderPart.Left:
        case BorderPart.Right: return "┃";
        case BorderPart.TopLeft: return "┏";
        case BorderPart.TopRight: return "┓";
        case BorderPart.BottomLeft: return "┗";
        case BorderPart.BottomRight: return "┛";
      }
    }
  }();

  /**
   *
   */
  public static readonly Rounded: Border = new class extends Border {
    getPart(part: BorderPart): string {
      switch (part) {
        case BorderPart.Top:
        case BorderPart.Bottom: return "─";
        case BorderPart.Left:
        case BorderPart.Right: return "│";
        case BorderPart.TopLeft: return "╭";
        case BorderPart.TopRight: return "╮";
        case BorderPart.BottomLeft: return "╰";
        case BorderPart.BottomRight: return "╯";
      }
    }
  }();

  /**
   *
   */
  public static readonly Square: Border = new class extends Border {
    getPart(part: BorderPart): string {
      switch (part) {
        case BorderPart.Top:
        case BorderPart.Bottom: return "─";
        case BorderPart.Left:
        case BorderPart.Right: return "│";
        case BorderPart.TopLeft: return "┌";
        case BorderPart.TopRight: return "┐";
        case BorderPart.BottomLeft: return "└";
        case BorderPart.BottomRight: return "┘";
      }
    }
  }();
}

export { BorderPart, Border }