"use client";

import type { CrochetMorph } from "./crochetMorphTypes";
import CrochetBearIllustration from "./CrochetBearIllustration";
import CrochetBunnyIllustration from "./CrochetBunnyIllustration";
import CrochetOwlIllustration from "./CrochetOwlIllustration";
import CrochetCatIllustration from "./CrochetCatIllustration";
import CrochetPuppyIllustration from "./CrochetPuppyIllustration";
import CrochetElephantIllustration from "./CrochetElephantIllustration";

type DetailLevel = "card" | "modal";

type CrochetProductIllustrationProps = {
  morph: CrochetMorph;
  detail?: DetailLevel;
};

function segmentCount(detail: DetailLevel): number {
  return detail === "modal" ? 28 : 22;
}

/** Router na proceduralne „pletene“ likove — bez HDRI-ja */
export default function CrochetProductIllustration({
  morph,
  detail = "card",
}: CrochetProductIllustrationProps) {
  const seg = segmentCount(detail);

  switch (morph) {
    case "bear":
      return <CrochetBearIllustration appearance="bear" seg={seg} />;
    case "teddyWarm":
      return <CrochetBearIllustration appearance="teddyWarm" seg={seg} />;
    case "teddyDust":
      return <CrochetBearIllustration appearance="teddyDust" seg={seg} />;
    case "teddyMocha":
      return <CrochetBearIllustration appearance="teddyMocha" seg={seg} />;
    case "bunny":
      return <CrochetBunnyIllustration seg={seg} />;
    case "owl":
      return <CrochetOwlIllustration seg={seg} />;
    case "cat":
      return <CrochetCatIllustration seg={seg} />;
    case "puppy":
      return <CrochetPuppyIllustration seg={seg} />;
    case "elephant":
      return <CrochetElephantIllustration seg={seg} />;
  }
}
