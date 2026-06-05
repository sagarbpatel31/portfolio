const DEFAULT_SITE_URL = "https://sagar-os.vercel.app";

function normalizeSiteUrl(value?: string) {
  const raw = value?.trim();

  if (!raw) {
    return DEFAULT_SITE_URL;
  }

  return raw.replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
