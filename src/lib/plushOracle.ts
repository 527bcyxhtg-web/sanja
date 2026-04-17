import type { ProductDetail } from "@/components/ui/ProductModal";
import { FALLBACK_PRODUCTS } from "@/data/products.fallback";

export const ORACLE_POSITIONS = [
  {
    title: "Proslost",
    subtitle: "Nit koja te je dovela ovdje",
  },
  {
    title: "Sadasnjost",
    subtitle: "Ritam koji danas nosis",
  },
  {
    title: "Buducnost",
    subtitle: "Mali znak kamo se dan otvara",
  },
] as const;

type OracleCardMeta = {
  oracleImage: string;
  oracleSeal: string;
  oracleAura: string;
  oracleWhisper: string;
};

export type PlushCard = ProductDetail & OracleCardMeta;

const ORACLE_META_BY_ID: Record<number, OracleCardMeta> = {
  1: {
    oracleImage: "/oracle/golden-teddy-portrait.png",
    oracleSeal: "Nasljedje mekoce",
    oracleAura: "topla odanost i njezna sigurnost",
    oracleWhisper: "dopusti da njeznost danas vodi odluke umjesto zurbe",
  },
  2: {
    oracleImage: "/oracle/blush-bunny-portrait.png",
    oracleSeal: "Skok povjerenja",
    oracleAura: "igriva lakoca i otvoreno srce",
    oracleWhisper: "ostavi prostor za male radosti koje inace pretrcis",
  },
  3: {
    oracleImage: "/oracle/playful-puppy-portrait.png",
    oracleSeal: "Veseli nemir",
    oracleAura: "radoznalost, humor i hrabrost za prvi potez",
    oracleWhisper: "ono sto izgleda neozbiljno danas otvara najzivlju ideju",
  },
  4: {
    oracleImage: "/oracle/moon-owl-portrait.png",
    oracleSeal: "Mrvica srece",
    oracleAura: "slatka spontanost i topla iznenadjenja",
    oracleWhisper: "ne podcjenjuj male znakove; danas bas oni nose poruku",
  },
  5: {
    oracleImage: "/oracle/blush-bunny-portrait.png",
    oracleSeal: "Tiha mekoća",
    oracleAura: "mir, cistoca namjere i njezna prisutnost",
    oracleWhisper: "blag ton i sporiji tempo danas ti otvaraju vise nego forsiranje",
  },
  6: {
    oracleImage: "/oracle/atelier-teddy-portrait.png",
    oracleSeal: "Srce ateljea",
    oracleAura: "samopouzdanje, toplina i plemenita postojanost",
    oracleWhisper: "kad zadrzis svoj ritam, drugi ce ga osjetiti bez mnogo objasnjenja",
  },
  7: {
    oracleImage: "/oracle/velvet-cat-portrait.png",
    oracleSeal: "Kucna carolija",
    oracleAura: "udobnost, paznja prema detalju i meki rituali",
    oracleWhisper: "ono sto njegujes kod kuce danas ti vraca fokus i snagu",
  },
  8: {
    oracleImage: "/oracle/blush-bunny-portrait.png",
    oracleSeal: "Sunce u dlanovima",
    oracleAura: "vedrina, svjezina i laksi pogled na planove",
    oracleWhisper: "dopusti da te danas vodi ono sto izgleda svijetlo i jednostavno",
  },
  9: {
    oracleImage: "/oracle/cloud-elephant-portrait.png",
    oracleSeal: "Cvjetna njeznost",
    oracleAura: "romantika, odanost i velika meka prisutnost",
    oracleWhisper: "srce zna put kad prestanes svaku stvar pretvarati u zadatak",
  },
  10: {
    oracleImage: "/oracle/moon-owl-portrait.png",
    oracleSeal: "Proljetni glasnik",
    oracleAura: "svjez pocetak, toplina i razigrani optimizam",
    oracleWhisper: "nesto malo i veselo danas mijenja cijeli ton prostora",
  },
};

const lowerFirst = (value?: string) => {
  if (!value) return "";
  const trimmed = value.trim().replace(/\s+/g, " ").replace(/[.!]+$/g, "");
  if (!trimmed) return "";
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
};

export const generateOracleStory = (cards: PlushCard[]): string => {
  const [past, present, future] = cards;
  const presentHighlight = lowerFirst(present.highlights?.[0]) || lowerFirst(present.tag) || "meki fokus";
  const futureImage = lowerFirst(future.storyLine) || lowerFirst(future.desc);

  return [
    `U karti proslosti pojavljuje se ${past.name}. Njezina nit nosi ${lowerFirst(past.oracleAura)}, a ispod toga se jos cuje ${lowerFirst(past.storyLine || past.desc)}. To je podsjetnik da sve sto danas zelis graditi vec ima svoj tihi temelj.`,
    `${present.name} sjedi u sredini raspleta i donosi pecat "${present.oracleSeal}". Ovo je dan za ${presentHighlight}, mirnije ruke i odluke koje ne traze dokazivanje. ${present.oracleWhisper}.`,
    `Na karti buducnosti otvara se ${future.name}. Ako ispratis danasnji ritam bez forsiranja, vecer se zatvara u tonu ${lowerFirst(future.oracleAura)}, a pred tobom ostaje slika ${futureImage}. ${future.oracleWhisper}.`,
  ].join("\n\n");
};

export const getAllPlushCards = (): PlushCard[] => {
  return FALLBACK_PRODUCTS.map((product) => ({
    ...product,
    ...(ORACLE_META_BY_ID[product.id] ?? ORACLE_META_BY_ID[1]),
  }));
};
