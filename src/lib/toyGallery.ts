/** Real catalog and community images shown in the story gallery. */

export type ToyGridSlot = "feature" | "tall" | "wide" | "compact" | "accent";

export type ToyGalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  slot: ToyGridSlot;
};

export const plushGalleryItems: ToyGalleryItem[] = [
  {
    src: "/catalog/bear-rose-dress.webp",
    alt: "Medvjedić u rozoj haljinici iz Sanja Plush kolekcije",
    width: 640,
    height: 640,
    slot: "feature",
  },
  {
    src: "/catalog/bunny-blue-overalls.webp",
    alt: "Zečić u plavom kombinezonu — ručno heklan amigurumi",
    width: 640,
    height: 766,
    slot: "tall",
  },
  {
    src: "/catalog/chick-cupcake.webp",
    alt: "Pilić u cupcake suknjici iz proljetne kolekcije",
    width: 640,
    height: 640,
    slot: "compact",
  },
  {
    src: "/social/creator-with-plush-trio.webp",
    alt: "Sanja s tri ručno heklana plišanca iz aktualne kolekcije",
    width: 640,
    height: 640,
    slot: "wide",
  },
  {
    src: "/catalog/lion-blue-overalls.webp",
    alt: "Lav u plavom kombinezonu — topla ručno rađena tekstura",
    width: 640,
    height: 682,
    slot: "accent",
  },
];
