"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, ShieldCheck, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { education, certifications } from "@/content/education";

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="education" ref={ref} className="py-24 sm:py-32">
      <Container>
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-10">
            <div className="mb-4 h-0.5 w-12 rounded-full bg-accent" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              education
            </h2>
          </motion.div>

          <div className="space-y-6">
            {education.map((edu) => (
              <motion.div key={edu.degree} variants={fadeIn("up", 0)}>
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <GraduationCap size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                      <div className="flex-grow">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                          <div>
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <p className="text-sm font-medium text-accent">{edu.university}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted">{edu.period}</p>
                            {edu.location && (
                              <p className="flex items-center gap-1 text-xs text-muted sm:justify-end">
                                <MapPin size={12} aria-hidden="true" />
                                {edu.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  {edu.coursework.length > 0 && (
                    <CardContent>
                      <p className="mb-3 text-sm text-muted">Relevant Coursework:</p>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((c) => (
                          <Badge key={c} variant="outline">{c}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}

            {certifications.map((cert) => (
              <motion.div key={cert.title} variants={fadeIn("up", 0)}>
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <ShieldCheck size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                      <div>
                        <h3 className="font-semibold">{cert.title}</h3>
                        <p className="text-sm text-muted">{cert.issuer}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
