import type { Markup } from "./Markup";

/**
 *
 */
type Optional<T> = T | undefined;

/**
 *
 */
enum Alignment {
  /**
   *
   */
  Left,

  /**
   *
   */
  Center,

  /**
   *
   */
  Right,
}

/**
 *
 */
interface Alignable {
  /**
   *
   */
  alignment: Alignment;
}
/**
 * A horizontal line.
 */
class Rule implements Alignable {
  /**
   * The title markup text.
   */
  public title: Optional<Markup>;

  /**
   * The title alignment.
   */
  public alignment: Alignment;

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
  public constructor(title?: Markup) {
    this.title = title;
    this.alignment = Alignment.Left;
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
}

export { Rule, Alignment }