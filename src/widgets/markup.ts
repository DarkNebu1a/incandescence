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

  public get length() {
    return this.text.length;
  }
}

export { Markup }
