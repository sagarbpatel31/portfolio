import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck, Trophy } from "lucide-react";
import { awards } from "@/content/awards";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export function WinsIndex() {
  const eventCount = new Set(awards.map((award) => award.event)).size;
  const hydraDBWins = awards.filter((award) =>
    award.event.toLowerCase().includes("hydradb")
  ).length;

  const metrics = [
    { value: awards.length, label: "technical recognitions" },
    { value: eventCount, label: "events" },
    { value: hydraDBWins, label: "HydraDB wins" },
  ];

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

        <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
          <Card className="border-accent/20 bg-gradient-to-br from-accent/8 via-card to-card">
            <CardContent className="p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                recognition.log
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Proof from shipping, testing, and teaching.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                These results span rapid product delivery, physical AI, multi-agent systems,
                infrastructure reliability, and developer education. Each entry names the
                technical contribution and links to public evidence where available.
              </p>
            </CardContent>
          </Card>

          <Card className="dash-card">
            <div className="dash-card-header">
              <span>recognition_summary</span>
              <span className="text-accent-green">2026</span>
            </div>
            <CardContent className="divide-y divide-border p-0">
              {metrics.map((metric) => (
                <div key={metric.label} className="flex items-end justify-between gap-4 px-5 py-4">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <span className="font-mono text-2xl font-bold text-accent">{metric.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="recognitions-title" className="py-10 sm:py-12">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <h2
              id="recognitions-title"
              className="font-mono text-xs uppercase tracking-widest text-muted"
            >
              selected recognitions
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {awards.map((award, index) => (
              <Card key={award.title} className="dash-card flex h-full flex-col">
                <div className="dash-card-header">
                  <span>award_{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-accent-amber">{award.year}</span>
                </div>
                <CardContent className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="rounded-md border border-accent-amber/20 bg-accent-amber/5 p-2 text-accent-amber">
                      <Trophy size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold leading-snug text-foreground">{award.title}</h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                        {award.event}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {award.description}
                  </p>

                  {award.links && award.links.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-1">
                      {award.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/50 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent/30 hover:text-accent"
                        >
                          {link.label}
                          <ExternalLink size={9} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-accent/20 bg-accent/5 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 shrink-0 text-accent" size={19} aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-foreground">The common thread is evidence.</h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Build quickly, reproduce precisely, measure behavior, and leave the system easier
                for the next engineer to understand.
              </p>
            </div>
          </div>
          <Link
            href="/projects"
            className="mt-4 inline-flex shrink-0 items-center gap-2 font-mono text-xs text-accent transition-colors hover:text-accent-light sm:mt-0"
          >
            inspect the work
            <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </section>
      </Container>
    </div>
  );
}
