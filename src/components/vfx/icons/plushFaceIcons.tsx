/** Abstract plush “faces” for avatar orbs — vector only */

export type PlushFaceVariant = "a" | "b" | "c";

interface PlushFaceSvgProps {
  variant: PlushFaceVariant;
  className?: string;
}

export function PlushFaceSvg({ variant, className }: PlushFaceSvgProps) {
  if (variant === "b") {
    return (
      <svg className={className} viewBox="0 0 40 34" fill="none" aria-hidden>
        <ellipse cx="20" cy="18" rx="16" ry="14" fill="rgba(255,248,240,0.12)" />
        <circle cx="14" cy="16" r="2.2" fill="rgba(232,213,163,0.9)" />
        <path
          d="M25 16h5"
          stroke="rgba(232,213,163,0.85)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M14 24q6 5 12 0"
          stroke="rgba(201,169,110,0.75)"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }
  if (variant === "c") {
    return (
      <svg className={className} viewBox="0 0 40 34" fill="none" aria-hidden>
        <ellipse cx="20" cy="18" rx="16" ry="14" fill="rgba(255,248,240,0.1)" />
        <ellipse cx="13" cy="16" rx="2.4" ry="2.8" fill="rgba(232,213,163,0.88)" />
        <ellipse cx="27" cy="16" rx="2.4" ry="2.8" fill="rgba(232,213,163,0.88)" />
        <path
          d="M12 23c3.5 6 12.5 6 16 0"
          stroke="rgba(201,169,110,0.8)"
          strokeWidth="1.35"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 40 34" fill="none" aria-hidden>
      <ellipse cx="20" cy="18" rx="16" ry="14" fill="rgba(255,248,240,0.12)" />
      <circle cx="14" cy="16" r="2.2" fill="rgba(232,213,163,0.9)" />
      <circle cx="26" cy="16" r="2.2" fill="rgba(232,213,163,0.9)" />
      <path
        d="M14 24q6 5 12 0"
        stroke="rgba(201,169,110,0.75)"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
