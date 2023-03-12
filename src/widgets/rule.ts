import { Alignment, type IAlignable } from "../alignment";
import type { Markup } from "./markup";
import { Border, BorderPart } from "../border";

/**
 * A horizontal line.
 */
export class Rule implements IAlignable {
  /**
   * The title markup text.
   */
  public title: Markup | undefined;

  /**
   * The title alignment.
   */
  public alignment: Alignment;

  /**
   * The rule border.
   */
  public border: Border;

  /**
   * @internal
   */
  private static readonly TITLE_PADDING: number = 1;
  /**
   * @internal
   */
  private static readonly EDGE_WIDTH: number = 2;

  /**
   * Initializes a new instance of the {@link Rule} class.
   * @param title The title markup text.
   * @example
   * // Method Chaining
   * const rule = new Rule()
   *    .setTitle(new Markup("Title"))
   *    .setAlignment(Alignment.Center);
   * @example
   * // Static Method
   * const rule = Rule.CenterAligned(new Markup("Title");
   * @see Markup
   * @see Alignment
   */
  public constructor(title: Markup) {
    this.title = title;
    this.alignment = Alignment.Left;
    this.border = Border.Square;
  }

  /**
   * Creates a new {@link Rule} instance with a left alignment.
   * @param title The title markup text.
   * @returns A new {@link Rule} instance with a left alignment.
   */
  public static LeftAligned(title: Markup): Rule {
    return new Rule(title).setAlignment(Alignment.Left);
  }

  /**
   * Creates a new {@link Rule} instance with a center alignment.
   * @param title The title markup text.
   * @returns A new {@link Rule} instance with a center alignment.
   */
  public static CenterAligned(title: Markup): Rule {
    return new Rule(title).setAlignment(Alignment.Center);
  }

  /**
   * Creates a new {@link Rule} instance with a right alignment.
   * @param title The title markup text.
   * @returns A new {@link Rule} instance with a right alignment.
   */
  public static RightAligned(title: Markup): Rule {
    return new Rule(title).setAlignment(Alignment.Right);
  }

  /**
   * Sets the title of the rule to the specified markup text.
   * @param title The title markup text.
   * @returns The current instance.
   */
  public setTitle(title: Markup): Rule {
    this.title = title;
    return this;
  }

  /**
   * Sets the alignment of the title to the specified alignment.
   * @param alignment The title alignment.
   * @returns The current instance.
   */
  public setAlignment(alignment: Alignment): Rule {
    this.alignment = alignment;
    return this;
  }

  /**
   * Sets the border of the rule to the specified border.
   * @param border The rule border.
   * @returns The current instance.
   */
  public setBorder(border: Border): Rule {
    this.border = border;
    return this;
  }

  public render(maxWidth: number): string {
    const additionalWidth = 2 * Rule.EDGE_WIDTH + 2 * Rule.TITLE_PADDING;

    if (this.title === undefined || maxWidth <= additionalWidth) {
      return this.GetLineWithoutTitle(maxWidth);
    }

    // Get the title and make sure it fits.
    // const title = GetTitleSegments(options, Title, maxWidth - additionalWidth);
    if (this.title.length > maxWidth - additionalWidth) {
      // Truncate the title
      //  = Segment.TruncateWithEllipsis(title, maxWidth - additionalWidth);
      if (this.title.length === 0) {
        // We couldn't fit the title at all.
        return this.GetLineWithoutTitle(maxWidth);
      }
    }

    const [left, right] = this.GetLineSegments(maxWidth, this.title.text);

    return left + this.title.text + right + "\n";
  }

  private GetLineWithoutTitle(width: number) {
    const text = this.border.getPart(BorderPart.Top).repeat(width);
    return text + "\n";
  }

  private GetLineSegments(width: number, title: string): [string, string] {
    const titleLength = title.length;

    const borderPart = this.border.getPart(BorderPart.Top);

    switch (this.alignment) {
      case Alignment.Left: {
        const left = borderPart.repeat(Rule.EDGE_WIDTH) + " ".repeat(Rule.TITLE_PADDING);

        const rightLength = width - titleLength - left.length - Rule.TITLE_PADDING;
        const right = " ".repeat(Rule.TITLE_PADDING) + borderPart.repeat(rightLength);

        return [left, right];
      }
      case Alignment.Center: {
        const leftLength = (width - titleLength) / 2 - Rule.TITLE_PADDING;
        const left = borderPart.repeat(leftLength) + " ".repeat(Rule.TITLE_PADDING);

        const rightLength = width - titleLength - left.length - Rule.TITLE_PADDING;
        const right = " ".repeat(Rule.TITLE_PADDING) + borderPart.repeat(rightLength);

        return [left, right];
      }
      case Alignment.Right: {
        const right = " ".repeat(Rule.TITLE_PADDING) + borderPart.repeat(Rule.EDGE_WIDTH);

        const leftLength = width - titleLength - right.length - Rule.TITLE_PADDING;
        const left = borderPart.repeat(leftLength) + " ".repeat(Rule.TITLE_PADDING);

        return [left, right];
      }
    }
  }
}