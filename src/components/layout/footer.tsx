import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/sagarbpatel31", Icon: Github },
  { name: "LinkedIn", url: "https://linkedin.com/in/sagarp31", Icon: Linkedin },
  { name: "Email", url: "mailto:sagar@myjobemails.com", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="glow-line" />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Sagar Patel
          </p>
          <nav aria-label="Social links">
            <ul className="flex items-center gap-4" role="list">
              {socialLinks.map(({ name, url, Icon }) => (
                <li key={name}>
                  <a
                    href={url}
                    target={url.startsWith("mailto") ? undefined : "_blank"}
                    rel={url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-accent"
                    aria-label={name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
