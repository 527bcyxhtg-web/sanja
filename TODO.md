# Daily Plush Oracle Implementation TODO

## Plan Summary
Replace game with daily 3-card plush oracle in Hero section. Once/day draw, creative Past/Present/Future story.

## Steps

### [x] 1. Planning & Research (Complete)
- Analyzed files: Hero.tsx, products.fallback.ts, toyGallery.ts, toys PNGs.
- Confirmed no existing game.
- Plan approved by user.

### [ ] 2. Create Utilities
- Create `src/lib/plushOracle.ts` (morph-to-img mapping).
- Create `src/hooks/useDailyPlushOracle.ts` (logic, localStorage, story gen).

### [ ] 3. Update Hero Component
- Edit `src/components/layout/Hero.tsx` (add oracle section, hook).
- Edit `src/components/layout/Hero.module.css` (styles).

### [ ] 4. Test Feature
- Check daily reset (localStorage).
- Verify PNG renders (vertical/transparent).
- GSAP animations smooth.

### [ ] 5. Assets Check
- Confirm all toy PNGs exist/map correctly.
- Test in browser.

### [ ] 6. Completion
- Update TODO.
- attempt_completion.

Current: Starting step 2.
