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

export { Alignment, Alignable }