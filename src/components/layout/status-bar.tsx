import { profile } from "@/content/profile";

export function StatusBar() {
  return (
    <div className="status-bar" role="status" aria-label="Portfolio status">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4">
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-green" />
          <span className="text-accent-green">OPEN TO ROLES</span>
        </span>
        <span className="hidden truncate sm:inline">{profile.location}</span>
        <a
          href={`mailto:${profile.email}`}
          className="truncate text-accent transition-colors hover:text-accent-light"
        >
          {profile.email}
        </a>
      </div>
    </div>
  );
}
