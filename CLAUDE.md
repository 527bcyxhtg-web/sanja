# sanja-plush — Project Memory

## What this is

Premium e-commerce landing page for **Sanja Krstić**, a Croatian artist who makes handmade luxury
crochet/amigurumi plush toys. The site targets **awwwards Site of the Day** quality — cinematic scroll
animations, WebGL 3D product visualization, custom cursor, smooth scroll, dark luxury aesthetic.

## Stack snapshot

| Tool | Version | Role |
| --- | --- | --- |
| Next.js | 15.2.4 | Framework, static export |
| React | 19 | UI |
| TypeScript | 5.7 | Strict typing |
| GSAP | 3.15 | Scroll animations, timelines |
| Lenis | 1.3 | Smooth scroll (synced with GSAP) |
| React Three Fiber | 9.6 | WebGL 3D |
| Drei | 10.7 | R3F helpers |
| Three.js | 0.170 | 3D engine |
| Supabase | 2.49 | Backend (anon, browser-side) |
| CSS Modules | — | Scoped styling |
| Wrangler | 4.28 | Cloudflare Pages deploy |

## Design tokens (globals.css)

```css
--deep      #080407   page background
--velvet    #14080f   card/section bg variant
--cream     #f7f2ea   primary text
--gold      #c9a96e   accent / cursor / borders
--gold2     #e8d5a3   labels / overlines
--rose      #c97b6e   CTA hover
--mauve     #8b5e7a   story / emotional accent
--mist      #c9b8c4   muted text
--champagne #f3e8d4   card highlights
--ease-out-expo cubic-bezier(0.19, 1, 0.22, 1)
```

## Page sections (in order, src/app/page.tsx)

1. `<Loader />` — preloader
2. `<Navigation />` — sticky nav with cart
3. `<Hero />` — full-viewport, video bg, massive display type
4. `<HandwovenSouls />` — brand story + 3D stage
5. `<CraftingProcess />` — 4-step crafting journey
6. `<Products />` — product grid with 3D thumbnails + modal
7. `<PlushAtelierGallery />` — masonry image gallery
8. `<TikTokShowcase />` — embedded TikTok / social content
9. `<Testimonials />` — customer reviews
10. `<About />` — artist bio
11. `<Contact />` — email contact form
12. `<Footer />` — links, legal, social

## Key utilities

- `src/lib/gsapUtils.ts` — `createTextReveal`, `createImageReveal`, `createFadeReveal`, `createStoryStageReveal`
- `src/hooks/useReducedMotion.ts` — ALWAYS check before running GSAP
- `src/hooks/useInView.ts` — IntersectionObserver hook
- `src/hooks/useHover.ts` — touch-aware hover
- `src/hooks/useScrollVelocity.ts` — scroll speed for parallax tuning
- `src/lib/siteImages.ts` — image path constants
- `src/lib/toyGallery.ts` — gallery data structure

## 3D components

All in `src/components/3d/`:

- `CrochetBear`, `CrochetBunny`, `CrochetCat`, `CrochetOwl`, `CrochetPuppy`, `CrochetElephant`
- `HandwovenSoulsStage3D` — full story scene (R3F)
- `ProductCrochetThumb3D` — per-product card canvas
- `crochetMaterials.ts` — shared Three.js materials
- `crochetMorphTypes.ts` — morph type definitions

## Commands

```bash
npm run dev          # dev :3000
npm run build        # static → ./out
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run pages:deploy # build + CF Pages deploy
```

## Cursor AI rules

All rules in `.cursor/rules/`:

- `00-project.mdc` — stack, conventions, golden rules
- `01-animations.mdc` — GSAP patterns
- `02-3d.mdc` — React Three Fiber patterns
- `03-design-system.mdc` — colour, typography, spacing
- `04-awwwards.mdc` — award-level techniques and quality bar
- `05-components.mdc` — component templates and available primitives
- `06-performance.mdc` — Core Web Vitals, bundle size, images
- `07-typescript.mdc` — strict TS patterns and common types
- `08-git-and-deploy.mdc` — git workflow, deploy, env vars

## Key decisions / why things are the way they are

- **Static export** — no SSR needed; Cloudflare Pages CDN gives global sub-100ms TTFB
- **CSS Modules** — not Tailwind; design tokens need precise luxury values impossible to express in utility classes
- **Lenis + GSAP ticker** — browser smooth scroll is inconsistent; Lenis + `gsap.ticker` gives frame-perfect sync
- **Dynamic 3D imports** — Three.js is ~250kb; lazy-loading keeps initial JS under 150kb gzipped
- **No border-radius > 4px** — luxury aesthetic convention; soft rounded corners feel consumer-grade
- **`cursor: none`** on body — custom GSAP cursor replaces OS cursor for premium feel

## TODO / known areas for improvement

- [ ] Add WebP video (`.webm`) alongside `.mp4` for smaller hero video
- [ ] Implement Supabase product data (currently static in component)
- [ ] Add horizontal scroll section for gallery
- [ ] Word-split animation on hero heading
- [ ] Magnetic button effect on primary CTAs
- [ ] Cart functionality (Supabase + state)
- [ ] SEO: structured data (JSON-LD) for products
- [ ] OG image generation for social sharing
