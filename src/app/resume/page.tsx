import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Download,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import resumeData from "@/content/resume-data.json";
import { getRecruiterBookingLink } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "ATS-friendly resume for Sagar Patel with explicit skills, scope, impact bullets, and hiring links.",
  alternates: { canonical: `${SITE_URL}/resume` },
  openGraph: {
    title: "Resume | SAGAR_OS",
    description: "ATS-friendly resume with skills, scope, and impact bullets.",
    url: `${SITE_URL}/resume`,
    type: "website",
  },
};

export default function ResumePage() {
  const scheduleLink = getRecruiterBookingLink(resumeData.name, resumeData.email);

  return (
    <div className="py-8">
      <Container>
        <Link
          href="/#dashboard"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={12} />
          cd ~/dashboard
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            ~/resume
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <section className="mb-8 grid gap-3 lg:grid-cols-[1.35fr_0.65fr]">
          <Card className="border-accent/20 bg-gradient-to-br from-accent/8 via-card to-card">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted">
                <span className="rounded border border-accent/20 bg-accent/5 px-2 py-0.5 text-accent">
                  ATS-friendly
                </span>
                <span>full-scope summary</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {resumeData.name}
                </h1>
                <p className="text-lg text-muted-foreground">{resumeData.title}</p>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {resumeData.shortBio}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} className="text-accent" aria-hidden="true" />
                  {resumeData.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles size={13} className="text-accent-green" aria-hidden="true" />
                  {resumeData.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-dim"
                >
                  <Download size={14} aria-hidden="true" />
                  Download PDF
                </a>
                <a
                  href={scheduleLink}
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                >
                  <CalendarDays size={14} aria-hidden="true" />
                  Book intro call
                </a>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                >
                  View projects
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </CardHeader>
          </Card>

          <Card className="dash-card">
            <div className="dash-card-header">
              <span>recruiter snapshot</span>
              <span className="text-accent-green">available</span>
            </div>
            <CardContent className="space-y-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Target roles
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  {resumeData.openTo.slice(0, 4).join(", ")}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  What I ship
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  {resumeData.summary}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Contact
                </p>
                <a
                  href={`mailto:${resumeData.email}`}
                  className="mt-1 inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-light"
                >
                  {resumeData.email}
                  <Mail size={13} aria-hidden="true" />
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="dash-card">
            <div className="dash-card-header">
              <span>professional summary</span>
              <span className="text-accent">keywords</span>
            </div>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {resumeData.summary}
              </p>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  ATS keyword set
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {resumeData.keywords}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="dash-card">
            <div className="dash-card-header">
              <span>scope summary</span>
              <span className="text-accent-green">end-to-end</span>
            </div>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface/50 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Experience
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {resumeData.experience.length} roles across embedded and AI systems
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface/50 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Projects
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {resumeData.projects.length} shipped projects and prototypes
                  </p>
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Focus areas
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {resumeData.focusAreas.map((area) => (
                    <Badge key={area} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              core skills
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {resumeData.skills.map((skill) => (
              <Card key={skill.category} className="dash-card">
                <div className="dash-card-header">
                  <span>{skill.category}</span>
                  <span>{skill.items.length}</span>
                </div>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {skill.items.join(" · ")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              impact bullets
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-3">
            {resumeData.experience.map((experience) => (
              <Card key={`${experience.company}-${experience.role}`} className="dash-card">
                <div className="dash-card-header">
                  <span>
                    {experience.role} · {experience.company}
                  </span>
                  <span>{experience.period}</span>
                </div>
                <CardContent className="space-y-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {experience.summary}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {experience.location}
                  </p>
                  <ul className="space-y-2">
                    {experience.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              selected projects
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {resumeData.projects.map((project) => (
              <Card key={project.title} className="dash-card">
                <div className="dash-card-header">
                  <span>{project.year}</span>
                  <span className="text-accent">{project.category}</span>
                </div>
                <CardContent className="space-y-3">
                  <h3 className="font-semibold leading-snug text-foreground">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.impact.map((metric) => (
                      <Badge key={metric}>{metric}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-3 lg:grid-cols-[1fr_1fr]">
          <Card className="dash-card">
            <div className="dash-card-header">
              <span>education</span>
              <span className="text-accent">formal training</span>
            </div>
            <CardContent className="space-y-4">
              {resumeData.education.map((item) => (
                <div key={item} className="rounded-lg border border-border bg-surface/40 p-4">
                  <p className="text-sm leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="dash-card">
            <div className="dash-card-header">
              <span>certifications</span>
              <span className="text-accent-green">verified</span>
            </div>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border bg-surface/40 p-4">
                {resumeData.certifications.map((cert) => (
                  <div key={cert} className="space-y-1">
                    <p className="font-semibold text-foreground">{cert}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-border bg-surface/40 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Availability
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  Open to remote or hybrid roles in the United States. Strong fit for teams that
                  want embedded depth, real-time systems thinking, and AI execution.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-4">
          <div className="dash-card">
            <div className="dash-card-header">
              <span>schedule</span>
              <span className="text-accent-amber">recruiter CTA</span>
            </div>
            <div className="dash-card-body flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  If a quick conversation is easier than email, schedule a short intro call.
                </p>
                <p className="text-sm text-muted-foreground">
                  The button opens a booking link when configured, otherwise it falls back to a
                  prefilled email.
                </p>
              </div>
              <a
                href={scheduleLink}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-dim"
              >
                <CalendarDays size={14} aria-hidden="true" />
                Book intro call
              </a>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
