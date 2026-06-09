# CLAUDE.md — sba-marketing

Public marketing site for **1West SBA** (SBA 7(a) small-business lending). Astro 4
static site, Tailwind, TypeScript strict. This is the only SBA repo that deploys to
**Cloudflare Pages** — every other repo in the `SBA-West` org targets Render.

Basic usage (commands, page list, stack) lives in `README.md`. This file is only the
team-durable facts and gotchas a fresh Claude would otherwise get wrong.

## Where this sits

Part of the SBA CRM polyrepo (GitHub org `SBA-West`, 9 repos): `sba-db` (shared
Drizzle schema), `sba-marketing` (this), `sba-{portal,broker,crm}-{web,api}`, and
`sba-windmill`. SBA CRM is 1West's net-new homegrown CRM for SBA 7(a) loans. This repo
is purely the public-facing site — it has no DB, no auth, no API of its own.

## Build / package manager

- **pnpm only** (corepack, pnpm 11). No `packageManager` field is pinned, but lock is
  `pnpm-lock.yaml` — do not introduce npm/yarn.
- Build: `pnpm build` → output `dist/` (static). Typecheck: `pnpm typecheck` (`astro check`).

## Deployment (pending — Cloudflare Pages)

**Not yet connected to a deploy target.** Connecting is a manual one-time step in the
Cloudflare dashboard (not automated, not in this repo):

- Create a Cloudflare Pages project from the `SBA-West/sba-marketing` GitHub repo.
- Build command: `pnpm build` · Output directory: `dist` (matches `wrangler.toml`
  `pages_build_output_dir = "dist"`).
- Production branch: `main`.

Do not move this to Render — it is intentionally the one Cloudflare repo.

## Pinned-version gotchas (these broke the build; do not "upgrade")

- **`@astrojs/sitemap` is pinned to exactly `3.2.1`** — sitemap 3.7.x relies on the
  `astro:routes:resolved` hook, which does not exist in Astro 4.x and crashes the
  build. Do **not** bump sitemap without first bumping Astro to a major that provides
  that hook.
- **Astro is pinned to `^4.16.x`.** The sitemap pin above is coupled to this. Treat an
  Astro major bump and a sitemap bump as one coordinated change, never independent.
- **`pnpm-workspace.yaml` uses `allowBuilds:` with booleans**, not
  `onlyBuiltDependencies`. pnpm 11 honors `allowBuilds: { esbuild: true, sharp: true }`
  here; it does **not** honor `onlyBuiltDependencies` in this setup. Those two build
  approvals are what let `astro build` / `astro check`'s pre-run install exit 0. If
  builds start failing with native-module approval prompts, this is the file to check.

## V1 scope — forms have no backend

The contact (`src/components/ContactForm.astro`) and broker-signup
(`src/components/BrokerSignupForm.astro`) forms are **lead-capture placeholders with no
backend wiring** (`action="#"`). Per the project's "Out of Scope for V1": ops
provisions brokers manually and follows up on submissions by hand; the full marketing
site build is post-MVP. The TODO is to POST to a lead-intake endpoint once
`sba-portal-api` exposes one. Do not assume a working form submission path exists.

## Production domain

`site` is set to `https://sba.1west.com` in three places that must stay in sync when the
real domain is decided: `astro.config.mjs` (`site`), `src/lib/site.ts` (`SITE.url`), and
`.env.example` (`PUBLIC_SITE_URL`). These feed canonical URLs, sitemap, and OG tags.
`public/robots.txt` also references the sitemap URL.
