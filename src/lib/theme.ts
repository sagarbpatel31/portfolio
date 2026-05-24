export const THEMES = ["cyan", "amber", "green", "light"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "cyan";
export const THEME_STORAGE_KEY = "sagar-os-theme";

export const THEME_LABELS: Record<Theme, string> = {
  cyan: "cyan",
  amber: "amber",
  green: "green",
  light: "light",
};

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (private mode); theme still applies for the session.
  }
  window.dispatchEvent(new CustomEvent<Theme>("themechange", { detail: theme }));
}

export function cycleTheme(): Theme {
  const current = getStoredTheme();
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
  setTheme(next);
  return next;
}
