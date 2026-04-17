## Learned User Preferences

- Often writes task instructions in Croatian; match the user language when they switch.
- Expects hosting and backends wired end-to-end (Cloudflare Pages, Supabase, GitHub) rather than partial setup.
- Wants agents to run real commands, fix issues thoroughly, and verify in the browser (including Comet) instead of only suggesting steps.
- When a plan file is attached, implement it without editing the plan; use existing todos instead of recreating them.
- Values short, concrete demonstrations that prove a Cursor plugin or workflow is useful in this repo.

## Learned Workspace Facts

- Premium landing / shop direction for handmade crochet plush; quality target is awwwards-level polish (see CLAUDE.md and `.cursor/rules/04-awwwards.mdc`).
- Next.js static export (`output: 'export'` in `next.config.js`); production build goes to `./out`; deploy is `npm run pages:deploy` (build plus `wrangler pages deploy out`).
- package.json stack: Next ^16.2.4, React 19, TypeScript, GSAP, Lenis, React Three Fiber, Drei, Three.js, `@supabase/supabase-js`; Wrangler for Cloudflare.
- UI uses CSS Modules and globals.css tokens; project rules say no Tailwind; imports use path alias `@/*` → `./src/*`.
- Animations must respect `prefers-reduced-motion` via `useReducedMotion`; 3D routes through `next/dynamic` with `{ ssr: false }`.
- Routine checks: `npm run lint`, `npm run typecheck`, optional `npm run md:lint` for markdown; `next.config.js` strips `console` in production.
