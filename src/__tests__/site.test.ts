describe("SITE_URL", () => {
  const ORIGINAL = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (ORIGINAL === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL;
    }
    jest.resetModules();
  });

  it("defaults to the canonical Vercel domain", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    jest.resetModules();
    const { SITE_URL } = require("@/lib/site");
    expect(SITE_URL).toBe("https://sagar-os.vercel.app");
  });

  it("honors NEXT_PUBLIC_SITE_URL when set", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    jest.resetModules();
    const { SITE_URL } = require("@/lib/site");
    expect(SITE_URL).toBe("https://example.com");
  });
});
