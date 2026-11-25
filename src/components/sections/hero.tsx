import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";

const contactIcons = { Email: Mail, LinkedIn: Linkedin, GitHub: Github };
const contactLinks = socials.filter(
  (social): social is (typeof socials)[number] & { name: keyof typeof contactIcons } =>
    Object.hasOwn(contactIcons, social.name)
);

export function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden border-b border-border/70">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-accent-glow),transparent_60%)]"
        aria-hidden="true"
      />
      <Container className="grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 lg:py-20">
        <div>
          <p className="mb-4 font-mono text-sm font-medium text-accent">{profile.name}</p>
          <h1 className="max-w-3xl text-[clamp(2.125rem,6vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.045em] text-foreground">
            Embedded Systems &amp;{" "}
            <span className="text-gradient-cyan">Firmware Validation</span>
          </h1>
          <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            I validate AI platform firmware at Microsoft, from bring-up and BIOS verification to
            release testing. My background spans embedded Linux, high-speed networking, and
            GPU inference on edge devices.
          </p>

          <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
            <Button asChild className="min-h-11 gap-2 px-4 text-sm font-semibold">
              <a href={profile.resumeUrl} download>
                <Download size={16} aria-hidden="true" />
                Download resume
              </a>
            </Button>
            <Button asChild variant="outline" className="min-h-11 gap-2 bg-card/60 px-4 text-sm">
              <a href="#selected-work">
                View selected work
                <ArrowDown size={15} aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5">
            {contactLinks.map(({ name, url }) => {
              const Icon = contactIcons[name];
              return (
                <a
                  key={name}
                  href={url}
                  className="inline-flex min-h-10 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  <Icon size={15} aria-hidden="true" />
                  {name}
                </a>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-accent/20 bg-card/90 shadow-xl shadow-background/45">
          <div className="flex items-center gap-4 px-5 py-4 sm:px-6">
            <Image
              src={profile.avatarUrl}
              alt=""
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-lg border border-border object-cover object-[center_28%]"
            />
            <div>
              <p className="text-sm font-semibold text-foreground">Software Validation Engineer</p>
              <p className="mt-1 text-sm text-muted-foreground">Microsoft</p>
            </div>
          </div>
          <dl className="space-y-4 border-t border-border px-5 py-4 sm:px-6">
            <div>
              <dt className="font-mono text-xs text-muted-foreground">Core stack</dt>
              <dd className="mt-1 text-sm text-foreground">C/C++ · Python · Linux · Yocto</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted-foreground">Robotics &amp; edge AI</dt>
              <dd className="mt-1 text-sm text-foreground">ROS 2 · Jetson · CUDA · TensorRT</dd>
            </div>
          </dl>
          <Link
            href="/resume"
            className="block border-t border-border px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-card-hover sm:px-6"
          >
            Experience &amp; education <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
