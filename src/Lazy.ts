type Nullable<T> = T | null;
type Function<R> = () => R;

/**
 * Provides support for lazy initialization.
 */
class Lazy<T extends object> {
  private instance: Nullable<T> = null;
  private readonly initializer: Function<T>;

  /**
   * Initializes a new instance of the {@link Lazy} class. When lazy initialization occurs, the specified initialization function is used.
   * @param initializer The function that is invoked to produce the lazily initialized value when it is needed.
   */
  public constructor(initializer: Function<T>) {
    this.initializer = initializer;
  }

  /**
   * Gets the lazily initialized value of the current {@link Lazy} instance.
   */
  public get value(): T {
    if (this.instance === null) this.instance = this.initializer();
    return this.instance;
  }

  /**
   * Gets a value that indicates whether a value has been created for this {@link Lazy} instance.
   */
  public get instantiated() {
    return this.instance !== null;
  }

  /**
   * Creates and returns a string representation of the value property for this instance.
   * @returns The result of calling the `toString()` method on the value property for this instance, if the value has been created (that is, if the instantiated property returns true). Otherwise, an error is thrown indicating that the value has not been created.
   * @throws {Error} The Value property is null.
   */
  public toString(): string {
    if (this.instance !== null) return this.instance.toString();
    throw new Error("Value has not been instantiated yet.");
  }
}

export { Lazy };
