import { MeshStandardMaterial } from "three";

export function makeCrochetMat(
  color: string,
  roughness = 0.88,
  metalness = 0.08
): MeshStandardMaterial {
  return new MeshStandardMaterial({ color, roughness, metalness });
}

export function makeAccentMat(color: string): MeshStandardMaterial {
  return new MeshStandardMaterial({
    color,
    roughness: 0.55,
    metalness: 0.26,
  });
}

export function makeGlossMat(color: string): MeshStandardMaterial {
  return new MeshStandardMaterial({
    color,
    roughness: 0.28,
    metalness: 0.45,
  });
}

export function disposeMats(...mats: MeshStandardMaterial[]): void {
  mats.forEach((m) => m.dispose());
}
