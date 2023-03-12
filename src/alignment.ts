/**
 *
 */
export enum Alignment {
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
export interface IAlignable {
  /**
   *
   */
  alignment: Alignment;
}