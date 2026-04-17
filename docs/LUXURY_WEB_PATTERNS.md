# Luksuzne marketing stranice — obrasci (inspiracija, ne kopija)

Ovaj dokument **ne** reproducira tuđe fontove, slike, maskote ili kod. Služi kao **interna mapa tehnika**
koje premium studio često kombinira, s vezom na **ovaj** projekt (`sanja-plush`).

## Scroll i ritam

- **Scroll-driven storytelling:** sekcije se otkrivaju jedna za drugom (clip-path, blur, pomak), često jednom
  po ulasku u viewport (`toggleActions: "play none none none"`).
- **Kod nas:** `createTextReveal`, `createImageReveal`, `createFadeReveal`, `createStoryStageReveal` u
  [`src/lib/gsapUtils.ts`](../src/lib/gsapUtils.ts) + ScrollTrigger; Lenis sinkroniziran s GSAP tickerom
  (provider u aplikaciji).

## Dubina i „sloj“

- **Višeslojni background:** radijalni gradijenti + blagi šum / grain + diskretni „light leak“.
- **Kod nas:** `PageAmbient`, `shopBg` / `shopNoise` u CSS modulima, `HandwovenSouls` pozadinska mreža.

## 3D i interakcija

- **Hero ili blok s WebGL-om:** kratka scena (osvjetljenje + jednostavna geometrija), često lazy/dynamic
  import zbog bundla i SSR-a.
- **Kod nas:** [`HandwovenSoulsStage3D`](../src/components/layout/HandwovenSoulsStage3D.tsx) — R3F +
  `Float`, klik mijenja stanje (igra „tri niti“). **`prefers-reduced-motion`:** statičan 2D fallback u
  [`HandwovenSouls.tsx`](../src/components/layout/HandwovenSouls.tsx).

## Tipografija i hijerarhija

- **Display + tijelo:** veliki naslov s negativnim letter-spacingom, sitna uppercase etiketa, proziran body
  tekst.
- **Kod nas:** varijable u [`globals.css`](../src/styles/globals.css) i pravila u `.cursor/rules/awwwards.mdc`.

## Mikro-interakcije

- **Kartice:** blagi 3D tilt na pointeru, glass border, hover overlay.
- **Kod nas:** `ShopProductCard` u [`Products.tsx`](../src/components/layout/Products.tsx) + modal s GSAP
  ulazom.

## Katalog / „shop“

- **Jedna cjelina + filteri:** korisnik bira segment (npr. uživo vs. ostalo) bez duplog markupa cijele
  sekcije.
- **Kod nas:** čipovi `SHOP_FILTERS` + jedan strip + jedna mreža u `Products.tsx`.

## Pravilo za reference

Kad gledaš vanjske stranice (npr. naglašene na Awwwards), koristi ih za **pitanja**: „Koji je ritam
otkrivanja?“, „Gdje je fokus pažnje?“, „Što se događa na mobile?“ — ne za **izvoz pixela ili teksta**.

## Održavanje

Kad mijenjaš animacije ili 3D, provjeri:

1. `npm run lint` i `npm run build`
2. Reduced motion i touch uređaji
3. Veličinu bundla nakon novih 3D ovisnosti
