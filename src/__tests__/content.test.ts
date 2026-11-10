import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experiences } from "@/content/experience";
import { skills } from "@/content/skills";
import { awards } from "@/content/awards";
import { socials } from "@/content/socials";
import { education, certifications } from "@/content/education";
import { highlights } from "@/content/highlights";
import { roleProfiles } from "@/content/roles";
import { getAllSlugs } from "@/lib/blog";

describe("Content: profile", () => {
  it("has all required fields", () => {
    expect(profile.name).toBeTruthy();
    expect(profile.title).toBeTruthy();
    expect(profile.tagline).toBeTruthy();
    expect(profile.shortBio).toBeTruthy();
    expect(profile.bio).toBeTruthy();
    expect(profile.email).toBeTruthy();
    expect(profile.resumeUrl).toBeTruthy();
    expect(profile.status).toBeTruthy();
  });

  it("has focus areas and open to arrays", () => {
    expect(profile.focusAreas.length).toBeGreaterThan(0);
    expect(profile.openTo.length).toBeGreaterThan(0);
  });

  it("email has valid format", () => {
    expect(profile.email).toMatch(/@/);
  });

  it("status indicates availability", () => {
    expect(profile.status.toLowerCase()).toMatch(/open|available/);
  });
});

describe("Content: highlights", () => {
  it("has at least 3 highlights", () => {
    expect(highlights.length).toBeGreaterThanOrEqual(3);
  });

  it("each highlight has required fields", () => {
    highlights.forEach((h) => {
      expect(h.title).toBeTruthy();
      expect(h.description).toBeTruthy();
      expect(h.tags.length).toBeGreaterThan(0);
    });
  });

  it("most highlights have metrics", () => {
    const withMetrics = highlights.filter((h) => h.metric);
    expect(withMetrics.length).toBeGreaterThanOrEqual(3);
  });
});

describe("Content: projects", () => {
  it("has at least 6 projects", () => {
    expect(projects.length).toBeGreaterThanOrEqual(6);
  });

  it("each project has all required fields", () => {
    projects.forEach((p) => {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.longDescription).toBeTruthy();
      expect(p.tags.length).toBeGreaterThan(0);
      expect(p.category).toBeTruthy();
      expect(p.maturity.label).toBeTruthy();
      expect(p.maturity.summary).toBeTruthy();
      expect(["green", "cyan", "amber"]).toContain(p.maturity.tone);
      expect(p.highlights.length).toBeGreaterThan(0);
      expect(p.year).toBeTruthy();
      expect(typeof p.featured).toBe("boolean");
    });
  });

  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has at least one featured project", () => {
    expect(projects.some((p) => p.featured)).toBe(true);
  });

  it("each project slug is URL-safe", () => {
    projects.forEach((p) => {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("uses valid evidence links when proof is public", () => {
    projects.forEach((project) => {
      project.evidence?.forEach((evidence) => {
        expect(evidence.label).toBeTruthy();
        expect(evidence.value).toBeTruthy();
        if (evidence.href) {
          expect(evidence.href).toMatch(/^https:\/\//);
        }
      });
    });
  });
});

describe("Content: role profiles", () => {
  it("defines three distinct hiring paths", () => {
    expect(roleProfiles).toHaveLength(3);
    expect(new Set(roleProfiles.map((role) => role.slug)).size).toBe(roleProfiles.length);
  });

  it("references real projects and blog posts", () => {
    const projectSlugs = new Set(projects.map((project) => project.slug));
    const blogSlugs = new Set(getAllSlugs());

    roleProfiles.forEach((role) => {
      expect(role.slug).toMatch(/^[a-z0-9-]+$/);
      expect(role.targetTitles.length).toBeGreaterThanOrEqual(3);
      expect(role.strengths).toHaveLength(3);
      expect(role.signals).toHaveLength(3);
      expect(role.projectSlugs).toHaveLength(3);
      expect(role.postSlugs).toHaveLength(4);
      role.projectSlugs.forEach((slug) => expect(projectSlugs.has(slug)).toBe(true));
      role.postSlugs.forEach((slug) => expect(blogSlugs.has(slug)).toBe(true));
    });
  });
});

describe("Content: experiences", () => {
  it("has at least 3 experiences", () => {
    expect(experiences.length).toBeGreaterThanOrEqual(3);
  });

  it("each experience has required fields", () => {
    experiences.forEach((e) => {
      expect(e.company).toBeTruthy();
      expect(e.role).toBeTruthy();
      expect(e.period).toBeTruthy();
      expect(e.location).toBeTruthy();
      expect(e.description).toBeTruthy();
      expect(e.highlights.length).toBeGreaterThan(0);
      expect(e.tags.length).toBeGreaterThan(0);
    });
  });

  it("lists Microsoft as the current role", () => {
    expect(experiences[0]).toMatchObject({
      company: "Microsoft",
      role: "Software Validation Engineer",
      period: "Sep 2026 – Present",
    });
    expect(experiences.find((e) => e.company === "Ciena")?.period).toBe(
      "May 2024 – Aug 2026",
    );
  });
});

describe("Content: skills", () => {
  it("has at least 5 skill categories", () => {
    expect(skills.length).toBeGreaterThanOrEqual(5);
  });

  it("each category has items", () => {
    skills.forEach((s) => {
      expect(s.category).toBeTruthy();
      expect(s.items.length).toBeGreaterThan(0);
    });
  });

  it("has unique category names", () => {
    const cats = skills.map((s) => s.category);
    expect(new Set(cats).size).toBe(cats.length);
  });
});

describe("Content: awards", () => {
  it("tracks all five technical recognitions", () => {
    expect(awards).toHaveLength(5);
    expect(awards.some((award) => award.title.includes("HydraDB Docs Winner"))).toBe(true);
    expect(awards.some((award) => award.title.includes("Ingestion Write-Safety"))).toBe(true);
  });

  it("each award has required fields", () => {
    awards.forEach((a) => {
      expect(a.title).toBeTruthy();
      expect(a.event).toBeTruthy();
      expect(a.year).toBeTruthy();
      expect(a.description).toBeTruthy();
      a.links?.forEach((link) => expect(link.url).toMatch(/^https:\/\//));
    });
  });
});

describe("Content: socials", () => {
  it("has at least 3 social links", () => {
    expect(socials.length).toBeGreaterThanOrEqual(3);
  });

  it("each social has name, url, and icon", () => {
    socials.forEach((s) => {
      expect(s.name).toBeTruthy();
      expect(s.url).toBeTruthy();
      expect(s.icon).toBeTruthy();
    });
  });

  it("URLs start with https or mailto", () => {
    socials.forEach((s) => {
      expect(s.url).toMatch(/^(https?:|mailto:)/);
    });
  });
});

describe("Content: education", () => {
  it("has 3 degrees", () => {
    expect(education.length).toBe(3);
  });

  it("each degree has required fields", () => {
    education.forEach((edu) => {
      expect(edu.degree).toBeTruthy();
      expect(edu.university).toBeTruthy();
      expect(edu.period).toBeTruthy();
      expect(edu.coursework.length).toBeGreaterThan(0);
    });
  });

  it("has certifications", () => {
    expect(certifications.length).toBeGreaterThan(0);
    certifications.forEach((c) => {
      expect(c.title).toBeTruthy();
      expect(c.issuer).toBeTruthy();
    });
  });
});
