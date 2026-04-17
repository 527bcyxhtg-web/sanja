"use client";

/**
 * @deprecated Koristi CrochetProductIllustration ili CrochetBearIllustration.
 * Ostavljeno kao tanki sloj za stare importe (palette → medvjedić).
 */
import CrochetBearIllustration from "./CrochetBearIllustration";

export type TeddyIllustrationPalette = "warm" | "dust" | "mocha";

const PALETTE_TO_APPEARANCE: Record<TeddyIllustrationPalette, "teddyWarm" | "teddyDust" | "teddyMocha"> = {
  warm: "teddyWarm",
  dust: "teddyDust",
  mocha: "teddyMocha",
};

type CrochetTeddyIllustrationProps = {
  palette: TeddyIllustrationPalette;
};

export default function CrochetTeddyIllustration({ palette }: CrochetTeddyIllustrationProps) {
  return <CrochetBearIllustration appearance={PALETTE_TO_APPEARANCE[palette]} seg={24} />;
}
