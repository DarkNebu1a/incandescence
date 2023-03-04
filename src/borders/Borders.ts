import { Border, BorderPart } from "./Border";

class NoBorder extends Border {
  public getPart(_part: BorderPart): string {
    return " ";
  }
}

class AsciiBorder extends Border {
  public getPart(part: BorderPart): string {
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
}

class DoubleBorder extends Border {
  public getPart(part: BorderPart): string {
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
}

class HeavyBorder extends Border {
  public getPart(part: BorderPart): string {
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
}

class RoundedBorder extends Border {
  public getPart(part: BorderPart): string {
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
}

class SquareBorder extends Border {
  public getPart(part: BorderPart): string {
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
}

export { NoBorder, AsciiBorder, DoubleBorder, HeavyBorder, RoundedBorder, SquareBorder }