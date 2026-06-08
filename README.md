# sba-marketing

Public marketing site for **1West SBA** — SBA 7(a) small-business lending.

Built with [Astro](https://astro.build) + TypeScript + Tailwind CSS. Deployed to
**Cloudflare Pages** as a fully static site.

> **V1 scope:** This is the placeholder marketing site per the project HANDOFF
> ("Marketing site full build" is post-MVP). The contact and broker-signup forms
> capture leads only — there is no backend wiring yet. Ops follows up manually.

## Stack

- Astro 4 (static output)
- Tailwind CSS via `@astrojs/tailwind`
- `@astrojs/sitemap` for `sitemap-index.xml`
- TypeScript strict mode

## Commands

| Command | Description |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the dev server at `localhost:4321` |
| `pnpm build` | Build the static site to `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm typecheck` | Run `astro check` (TS + template checks) |

Use **pnpm** exclusively.

## Pages

- `/` — home (hero, value props, how-it-works, CTA)
- `/about` — about the SBA 7(a) program and 1West SBA
- `/contact` — contact / get-started form
- `/broker-signup` — broker partner lead form
- `404` — not-found page

## Deployment (Cloudflare Pages)

- **Build command:** `pnpm build`
- **Output directory:** `dist`
- Configuration in `wrangler.toml` (`pages_build_output_dir = "dist"`).

Update `site` in `astro.config.mjs` to the production domain before launch (also
reflected in `src/lib/site.ts` and `public/robots.txt`).

## SEO

- Per-page `<title>`, meta description, canonical, Open Graph, and Twitter cards
  via `src/components/SEO.astro`.
- `public/robots.txt` and an auto-generated sitemap.
