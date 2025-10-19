import { cn } from "../cn";

describe("cn utility function", () => {
  it("merges multiple class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", true && "conditional", false && "not-included")).toBe(
      "base conditional",
    );
  });

  it("filters out falsy values", () => {
    expect(cn("class1", null, undefined, false, "class2")).toBe(
      "class1 class2",
    );
  });

  it("merges tailwind classes correctly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("handles empty strings", () => {
    expect(cn("", "class1", "")).toBe("class1");
  });

  it("handles array of classes", () => {
    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
  });

  it("returns empty string for no arguments", () => {
    expect(cn()).toBe("");
  });

  it("handles complex conditional logic", () => {
    const variant = "primary";
    const size = "large";
    expect(
      cn(
        "base-class",
        variant === "primary" && "bg-blue-500",
        size === "large" && "text-lg",
      ),
    ).toBe("base-class bg-blue-500 text-lg");
  });
});
