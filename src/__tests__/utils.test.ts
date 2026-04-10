import { cn } from "@/lib/utils";
import { fadeIn, staggerContainer, scaleIn, slideIn } from "@/lib/motion";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("resolves tailwind conflicts", () => {
    const result = cn("px-4", "px-6");
    expect(result).toBe("px-6");
  });

  it("handles undefined and null", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end");
  });
});

describe("Motion variants: fadeIn", () => {
  it("returns hidden and visible states", () => {
    const variant = fadeIn("up", 0);
    expect(variant).toHaveProperty("hidden");
    expect(variant).toHaveProperty("visible");
  });

  it("sets correct y offset for up direction", () => {
    const variant = fadeIn("up", 0);
    expect(variant.hidden.y).toBe(20);
    expect(variant.hidden.opacity).toBe(0);
    expect(variant.visible.y).toBe(0);
    expect(variant.visible.opacity).toBe(1);
  });

  it("sets correct y offset for down direction", () => {
    const variant = fadeIn("down", 0);
    expect(variant.hidden.y).toBe(-20);
  });

  it("sets correct x offset for left direction", () => {
    const variant = fadeIn("left", 0);
    expect(variant.hidden.x).toBe(20);
    expect(variant.hidden.y).toBe(0);
  });

  it("sets correct x offset for right direction", () => {
    const variant = fadeIn("right", 0);
    expect(variant.hidden.x).toBe(-20);
  });

  it("applies delay to visible transition", () => {
    const variant = fadeIn("up", 0.5);
    expect(variant.visible.transition.delay).toBe(0.5);
  });
});

describe("Motion variants: staggerContainer", () => {
  it("returns hidden and visible states", () => {
    const variant = staggerContainer(0.1, 0);
    expect(variant).toHaveProperty("hidden");
    expect(variant).toHaveProperty("visible");
  });

  it("sets stagger children in visible transition", () => {
    const variant = staggerContainer(0.2, 0.1);
    expect(variant.visible.transition.staggerChildren).toBe(0.2);
    expect(variant.visible.transition.delayChildren).toBe(0.1);
  });
});

describe("Motion variants: scaleIn", () => {
  it("starts with reduced scale and zero opacity", () => {
    const variant = scaleIn(0);
    expect(variant.hidden.scale).toBe(0.95);
    expect(variant.hidden.opacity).toBe(0);
    expect(variant.visible.scale).toBe(1);
    expect(variant.visible.opacity).toBe(1);
  });
});

describe("Motion variants: slideIn", () => {
  it("slides from left by default", () => {
    const variant = slideIn("left", 0);
    expect(variant.hidden.x).toBe(-40);
    expect(variant.hidden.y).toBe(0);
  });

  it("slides from right", () => {
    const variant = slideIn("right", 0);
    expect(variant.hidden.x).toBe(40);
  });

  it("slides from up", () => {
    const variant = slideIn("up", 0);
    expect(variant.hidden.y).toBe(40);
    expect(variant.hidden.x).toBe(0);
  });
});
