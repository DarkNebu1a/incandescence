import { describe, expect, it } from "vitest";
import { Alignment, Markup, Rule } from "../src";

describe("Rule", () => {
  it("LeftAligned() should create left aligned rule", () => {
    const rule = Rule.LeftAligned(Markup.Text("ABC"));

    expect(rule.alignment).toEqual(Alignment.Left);
    expect(rule.title).toBeDefined();
    expect((<Markup>rule.title).text).toBe("ABC");
  });

  it("CenterAligned() should create center aligned rule", () => {
    const rule = Rule.CenterAligned(Markup.Text("DEF"));

    expect(rule.alignment).toEqual(Alignment.Center);
    expect(rule.title).toBeDefined();
    expect((<Markup>rule.title).text).toBe("DEF");
  });

  it("RightAligned() should create right aligned rule", () => {
    const rule = Rule.RightAligned(Markup.Text("GHI"));

    expect(rule.alignment).toEqual(Alignment.Right);
    expect(rule.title).toBeDefined();
    expect((<Markup>rule.title).text).toBe("GHI");
  });

  it("Method Chaining should work", () => {
    const rule = new Rule();
    rule.setTitle(Markup.Text("XYZ")).setAlignment(Alignment.Right);

    expect(rule.alignment).toEqual(Alignment.Right);
    expect(rule.title).toBeDefined();
    expect((<Markup>rule.title).text).toBe("XYZ");
  });
});
