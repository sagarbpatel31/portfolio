import { education, certifications } from "@/content/education";

export function EduCard() {
  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span>credentials</span>
      </div>
      <div className="dash-card-body space-y-3">
        {education.map((edu) => (
          <div key={edu.university} className="flex items-start gap-2">
            <span className="text-accent-amber mt-0.5">&#x1F393;</span>
            <div>
              <div className="text-sm text-foreground">{edu.degree}</div>
              <div className="font-mono text-xs text-muted">
                {edu.university} ({edu.period})
              </div>
            </div>
          </div>
        ))}
        <div className="my-2 h-px bg-border" />
        {certifications.map((cert) => (
          <div key={cert.title} className="flex items-start gap-2">
            <span className="text-accent-green mt-0.5">&#x1F3C5;</span>
            <div>
              <div className="text-sm text-foreground">{cert.title}</div>
              <div className="font-mono text-xs text-muted">{cert.issuer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
