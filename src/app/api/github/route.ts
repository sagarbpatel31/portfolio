import { NextResponse } from "next/server";

export const revalidate = 3600; // cache 1 hour

// Known-good fallback values (verified from GitHub API).
// Used when the live fetch is rate-limited (Vercel shared IPs hit
// GitHub's 60 req/hr unauthenticated limit quickly) so the card never
// shows a broken 0/0/0 or "n/a" state.
const FALLBACK = { repos: 60, followers: 2, stars: 13 };

interface GitHubUser {
  public_repos?: number;
  followers?: number;
}

interface GitHubRepo {
  stargazers_count?: number;
}

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "sagar-os-portfolio",
    };
    // Optional auth — lifts rate limit to 5000 req/hr if a token is set
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/sagarbpatel31", {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/users/sagarbpatel31/repos?per_page=100", {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    // If GitHub rejects (rate limit / error), use fallback
    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json(FALLBACK);
    }

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    const stars = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0)
      : FALLBACK.stars;

    return NextResponse.json({
      repos: user.public_repos ?? FALLBACK.repos,
      followers: user.followers ?? FALLBACK.followers,
      stars: stars || FALLBACK.stars,
    });
  } catch {
    return NextResponse.json(FALLBACK);
  }
}
