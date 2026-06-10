# afrianluthfan.github.io

Personal portfolio and resume for **Afrian Luthfan**, built as a single-page,
neo-brutalist site. Every resume section renders as a full-viewport
`<section>`, and all content is driven by one data file: [`cv.yaml`](./cv.yaml).

## Stack

- [Next.js](https://nextjs.org/) (App Router, static export)
- [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP + ScrollTrigger](https://gsap.com/) for scroll choreography
- [Bun](https://bun.sh/) as package manager and script runner

## Development

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # static export to ./out
```

## Editing content

The site reads `cv.yaml` at build time (`src/lib/cv.ts`). Update the YAML,
rebuild, done. No component changes needed for new jobs, certifications,
projects, or organizational roles.

## Deployment

Pushes to `master` trigger the GitHub Actions workflow in
`.github/workflows/nextjs.yml`, which builds with Bun and deploys the `out/`
directory to GitHub Pages.

## Notes

- Sections use `min-h-[100dvh]` (not `h-screen`) to avoid the iOS Safari
  viewport jump.
- All motion honors `prefers-reduced-motion`: GSAP pinning, scrub reveals,
  and the marquee collapse to a static page.
- `scripts/shots.mjs` captures full-site screenshots with puppeteer-core for
  visual QA (`bun scripts/shots.mjs` while serving `out/` on port 8741).
