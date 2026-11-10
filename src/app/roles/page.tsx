import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { roleProfiles } from "@/content/roles";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Role Fit",
  description:
    "Tailored hiring paths for firmware validation, embedded systems, and edge AI or robotics roles.",
  alternates: { canonical: `${SITE_URL}/roles` },
  openGraph: {
    title: "Role Fit | SAGAR_OS",
    description:
      "Choose the technical path most relevant to your team and review curated evidence, projects, and writing.",
    url: `${SITE_URL}/roles`,
    type: "website",
  },
};

export default function RolesPage() {
  return (
    <div className="py-8">
      <Container>
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          cd ~/home
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            ~/role-fit — {roleProfiles.length} paths
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <section className="relative overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-br from-accent/10 via-card to-card p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]"
          />
          <div className="relative max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              <BriefcaseBusiness size={13} aria-hidden="true" />
              recruiter router
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Choose the evidence path that matches your team.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              The homepage stays concise. Each path below curates the experience, projects,
              technical writing, and operating strengths most relevant to one hiring need.
            </p>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-3" aria-label="Role paths">
          {roleProfiles.map((role) => (
            <Link
              key={role.slug}
              href={`/roles/${role.slug}`}
              className="dash-card group flex h-full flex-col transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="dash-card-header">
                <span>{role.eyebrow}</span>
                <ArrowUpRight
                  size={13}
                  className="text-muted transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
              <div className="dash-card-body flex flex-1 flex-col">
                <h2 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {role.label}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {role.recruiterSummary}
                </p>

                <div className="mt-5 space-y-2">
                  {role.strengths.slice(0, 3).map((strength) => (
                    <div key={strength.title} className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 size={13} className="shrink-0 text-accent-green" aria-hidden="true" />
                      {strength.title}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                  {role.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs text-accent">
                  Inspect role fit
                  <ArrowUpRight size={12} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </section>
      </Container>
    </div>
  );
}
