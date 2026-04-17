# Catalog Image Prompts

Ovaj dokument priprema finalni AI pass za slike proizvoda koje korisnik želi u stilu:

- `HDR 3D`
- `bez pozadine / transparent background`
- `vertical`
- fokus na sam proizvod, bez ruke, biljaka, stola ili interijera

Napomena: u ovom turnu slike nisu generirane jer `image_gen` nije bio dostupan, a CLI fallback smije se koristiti samo uz eksplicitnu potvrdu korisnika. Trenutni katalog zato koristi originalne referentne fotografije, a ovaj fajl ostavlja gotov prompt paket za sljedeći korak.

## Globalni stil

```text
Use case: stylized-concept
Asset type: ecommerce product image
Primary request: turn the referenced crochet plush toy into a premium HDR 3D studio render
Scene/backdrop: transparent background, no floor, no props, no hands, no flowers, no room elements
Style/medium: plush 3D product render, soft luxury materials, high-end marketplace polish
Composition/framing: vertical 4:5 composition, centered full-body character, generous safe margins
Lighting/mood: cinematic softbox lighting, subtle rim light, clean HDR highlights, gentle shadowing in the yarn texture
Color palette: preserve original toy colors faithfully
Materials/textures: rich chenille yarn, visible plush loops, soft matte fibers, glossy safety eyes
Constraints: keep the original toy design, outfit, accessories, proportions, and facial expression
Avoid: hands, plants, furniture, text, watermark, extra accessories, background scene
```

## Product prompts

### Medvjedić Rozi

Reference: `/catalog/bear-rose-dress.webp`

```text
Primary request: premium HDR 3D cutout render of a warm brown crochet teddy bear wearing a powder-pink dress with a pink flower on one ear
Constraints: preserve the rounded teddy face, black eyes, white snout, pink dress silhouette, and flower placement
```

### Zeko Denim

Reference: `/catalog/bunny-blue-overalls.webp`

```text
Primary request: premium HDR 3D cutout render of a beige crochet bunny with long floppy ears wearing blue overalls with two white buttons
Constraints: preserve the long ears, soft muzzle, blue overall shape, and gentle expression
```

### Majmunčić Sandi

Reference: `/catalog/monkey-sand-overalls.webp`

```text
Primary request: premium HDR 3D cutout render of a crochet monkey character with textured brown hair and sand-colored overalls
Constraints: preserve the smile, ear shape, shaggy yarn hair, and overall proportions
```

### Pilić Muffin

Reference: `/catalog/chick-cupcake.webp`

```text
Primary request: premium HDR 3D cutout render of a small yellow crochet chick sitting in a pink cupcake-style skirt base
Constraints: preserve the tiny wings, beak shape, rounded body, and pink cupcake silhouette
```

### Zečica Blush

Reference: `/catalog/bunny-blush-dress.webp`

```text
Primary request: premium HDR 3D cutout render of a white crochet bunny wearing a blush pink dress with a pink flower accessory on one ear
Constraints: preserve the white body, pink dress hem, flower placement, and long floppy ears
```

### Lav Leo

Reference: `/catalog/lion-blue-overalls.webp`

```text
Primary request: premium HDR 3D cutout render of a crochet lion with a large textured brown mane and light blue overalls
Constraints: preserve the large mane volume, snout color, paw tips, and overall outfit shape
```

### Zečica Apron

Reference: `/catalog/bunny-pink-apron.webp`

```text
Primary request: premium HDR 3D cutout render of a beige crochet bunny wearing a pink apron dress with a white heart on the front
Constraints: preserve the apron heart detail, bunny ears, soft beige tone, and friendly expression
```

### Zečica Buttercup

Reference: `/catalog/bunny-buttercup-dress.webp`

```text
Primary request: premium HDR 3D cutout render of a white crochet bunny in a pastel yellow dress with two small yellow flowers on the head
Constraints: preserve the yellow dress volume, flower details, white body, and facial proportions
```

### Janje Rosie

Reference: `/catalog/lamb-rose-overalls.webp`

```text
Primary request: premium HDR 3D cutout render of a white crochet lamb wearing dark rose overalls with pink flowers on the head
Constraints: preserve the lamb ears, horn detail, pink floral headpiece, and overall silhouette
```

### Pilić Mint

Reference: `/catalog/chick-mint-bonnet.webp`

```text
Primary request: premium HDR 3D cutout render of a pale yellow crochet chick wearing a mint bonnet and matching neck bow
Constraints: preserve the orange beak, mint bonnet flowers, rounded body, and soft seasonal styling
```

### Medo Bonnet

Reference: `/catalog/teddy-bonnet-rose.webp`

```text
Primary request: premium HDR 3D cutout render of a cream crochet teddy bear wearing a pink bonnet and matching pink dress
Constraints: preserve the bonnet ruffle shape, dress outline, black nose, and large glossy eyes
```

### Medvjedić Petal

Reference: `/catalog/bear-petal-dress.webp`

```text
Primary request: premium HDR 3D cutout render of a light cream crochet teddy bear wearing a soft pink dress with a small pink flower on one ear
Constraints: preserve the lighter body color, white muzzle, pink dress shape, and flower placement
```
