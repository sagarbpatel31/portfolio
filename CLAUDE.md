# CLAUDE.md — SAGAR_OS Portfolio

## Stack

Next.js 16.2.0 | React 19 | TypeScript 5 | Tailwind CSS 4 | Framer Motion 12
Static generation via App Router. Jest 30 + React Testing Library for tests.

## Commands

- `npm run dev` — dev server (requires `--webpack` flag, already in script)
- `npm run build` — production build (SSG, 16 pages)
- `npm run test` — Jest verbose (137 tests across 6 suites)
- `npm run lint` — ESLint 9

## File Structure

```
src/
├── app/
│   ├── page.tsx              # Home — SERVER component (fs-based blog read)
│   ├── layout.tsx            # Root layout: Inter + JetBrains Mono fonts, Navbar, StatusBar, scanline
│   ├── globals.css           # Theme: @theme inline block, utility classes, animations
│   ├── blog/[slug]/page.tsx  # SSG blog detail (generateStaticParams)
│   ├── projects/[slug]/      # SSG project detail
│   ├── error.tsx, not-found.tsx, sitemap.ts
│
├── components/
│   ├── boot-sequence.tsx     # 3s init animation, sessionStorage skip on revisit
│   ├── boot-wrapper.tsx      # Client boundary — wraps Hero + Dashboard
│   ├── dashboard.tsx         # Bento grid of all card components
│   ├── terminal.tsx          # Interactive terminal: help/about/skills/experience/projects/contact/status/resume/clear
│   ├── cards/                # stats, process, skills, timeline, activity, edu, contact
│   ├── layout/               # navbar, mobile-nav, footer (returns null), status-bar
│   ├── sections/             # hero + legacy sections (about, highlights, experience, projects, skills, education, awards, blog, contact)
│   └── ui/                   # button (CVA), card, badge, container, section-heading
│
├── content/                  # Data layer — plain TS exports
│   ├── profile.ts            # name, title, tagline, bio, email, avatarUrl, resumeUrl, status
│   ├── projects.ts           # 8 projects (slug, title, tags, featured, year, links)
│   ├── experience.ts         # Ciena, Cisco, TCS
│   ├── skills.ts             # 6 categories with items[]
│   ├── education.ts          # degrees[] + certifications[]
│   ├── awards.ts             # 3 hackathon awards
│   ├── highlights.ts         # 5 key achievements
│   ├── socials.ts            # GitHub, LinkedIn, Email
│   └── blog/*.mdx            # MDX posts (gray-matter frontmatter + reading-time)
│
├── lib/
│   ├── blog.ts               # getAllPosts(), getPostBySlug() — fs.readFileSync (server only)
│   ├── motion.ts             # fadeIn, staggerContainer, scaleIn, slideIn variants
│   ├── use-active-section.ts # IntersectionObserver scroll spy
│   └── utils.ts              # cn() = clsx + tailwind-merge
│
├── types/index.ts            # Project, Experience, Skill, Award, BlogPost, etc.
└── __tests__/                # Jest: components/, content, types, utils
```

## Key Patterns

### Server/Client Boundary
- `page.tsx` = Server (uses Node `fs` to read blog MDX)
- `BootWrapper` = first `"use client"` boundary on homepage
- Blog data extracted as serializable `{ slug, title, date }` and passed as props
- All cards/, terminal, dashboard, navbar, status-bar = client components

### Theme (globals.css)
- Dark navy bg `#0a0f1a`, cyan accent `#00fff5`, green/amber/rose accents
- Tailwind 4 `@theme inline {}` block with CSS custom properties
- Fonts: Inter (`--font-sans`), JetBrains Mono (`--font-mono`)
- Utility classes: `.dash-card`, `.glow-accent`, `.glow-text`, `.text-gradient-cyan`, `.terminal-window`, `.scanline-overlay`, `.skill-bar`, `.boot-line`, `.status-bar`

### Content System
- Structured data: `src/content/*.ts` — exported arrays/objects
- Blog: MDX files in `src/content/blog/`, parsed by `lib/blog.ts` with gray-matter + reading-time
- Types shared via `src/types/index.ts`

### Animations
- Framer Motion variants from `lib/motion.ts`
- Pattern: `motion.div` + `variants={fadeIn("up", 0)}` + `useInView` for scroll triggers
- Boot sequence: timed lines → fade out → `sessionStorage.setItem('booted', 'true')`
- Dashboard cards: `staggerContainer` parent with `fadeIn` children

### Testing
- Jest 30 + jsdom + `@testing-library/react`
- Framer Motion mock required (renders children directly, `useInView` returns `true`)
- Terminal component mocked in sections test
- Path alias `@/` resolved via `moduleNameMapper` in jest.config.ts

## Conventions

- `@/*` path alias → `./src/*`
- UI primitives use CVA (class-variance-authority) for variant props
- `cn()` for conditional className merging
- `--webpack` flag for dev/build (turbopack disabled)
- Footer returns `null` — replaced by StatusBar (kept for backward compat on detail pages)
- Navbar links: `/home`, `/dashboard`, `/resume` (monospace, hacker style)

## Public Assets

- `/profile.jpeg` — headshot (592KB)
- `/resume.pdf` — downloadable resume (636KB)
- `/robots.txt` — crawler rules
