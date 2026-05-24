import {
  THEMES,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  getStoredTheme,
  setTheme,
  cycleTheme,
} from "@/lib/theme";

describe("theme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("defaults to the default theme when nothing is stored", () => {
    expect(getStoredTheme()).toBe(DEFAULT_THEME);
  });

  it("ignores an invalid stored value", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "bogus");
    expect(getStoredTheme()).toBe(DEFAULT_THEME);
  });

  it("persists, applies data-theme, and dispatches an event on set", () => {
    const handler = jest.fn();
    window.addEventListener("themechange", handler);
    setTheme("amber");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("amber");
    expect(document.documentElement.dataset.theme).toBe("amber");
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener("themechange", handler);
  });

  it("cycles through themes in order and wraps around", () => {
    setTheme(THEMES[THEMES.length - 1]);
    expect(cycleTheme()).toBe(THEMES[0]);
    expect(cycleTheme()).toBe(THEMES[1]);
  });
});
