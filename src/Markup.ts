/**
 *
 */
class Markup {
  /**
   *
   */
  public text: string

  /**
   *
   * @param text
   */
  public constructor(text: string) {
    this.text = text;
  }

  /**
   *
   * @param text
   */
  public static Text(text: string): Markup {
    return new Markup(text);
  }
}

export { Markup }