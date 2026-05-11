import { NextResponse } from "next/server";

export const revalidate = 3600; // cache 1 hour

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/sagarbpatel31", {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/users/sagarbpatel31/repos?per_page=100", {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }),
    ]);

    const user = await userRes.json();
    const repos = await reposRes.json();

    const stars = Array.isArray(repos)
      ? repos.reduce(
          (sum: number, r: { stargazers_count: number }) =>
            sum + (r.stargazers_count ?? 0),
          0
        )
      : 0;

    return NextResponse.json({
      repos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      stars,
    });
  } catch {
    return NextResponse.json({ repos: 0, followers: 0, stars: 0 });
  }
}
