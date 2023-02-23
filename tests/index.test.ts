import { describe, it, expect } from "vitest";
import { Lazy } from "../src";

describe("Lazy", () => {
  it("toString() should throw error", () => {
    const lazy = new Lazy<number[]>(() => []);
    expect(() => lazy.toString()).toThrowError("Value has not been instantiated yet.");
  });

  it("value should have length 3", () => {
    const lazy = new Lazy(() => [4, 5, 6]);
    expect(lazy.value).toHaveLength(3);
  });

  it("value should not be instantiated", () => {
    const lazy = new Lazy<number[]>(() => []);
    expect(lazy.instantiated).toBe(false);
  });

  it("value should be instantiated", () => {
    const lazy = new Lazy<number[]>(() => []);
    lazy.value;
    expect(lazy.instantiated).toBe(true);
  });
});
