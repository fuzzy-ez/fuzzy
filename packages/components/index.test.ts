import { describe, expect, it } from "vitest";
import { add } from ".";

describe("test:vitest", () => {
  it("add", () => {
    expect(add(1, 2)).toBe(3);
  });
});
