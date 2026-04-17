/** Shared SVG story symbols — vector “HD” at any DPI; pass unique `idPrefix` per mount for gradients. */

export function IconHeart({ idPrefix }: { idPrefix: string }) {
  const id = `${idPrefix}-he`;
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8d5a3" />
          <stop offset="50%" stopColor="#c9a96e" />
          <stop offset="100%" stopColor="#8b5e7a" />
        </linearGradient>
      </defs>
      <path
        d="M32 54C32 54 8 36 8 22c0-8 6.5-14 14-14 5.2 0 9.8 2.8 12 7 2.2-4.2 6.8-7 12-7 7.5 0 14 6 14 14 0 14-24 32-24 32z"
        fill={`url(#${id})`}
        fillOpacity={0.88}
        stroke="rgba(255,248,240,0.35)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function IconSpark({ idPrefix }: { idPrefix: string }) {
  const id = `${idPrefix}-sp`;
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8f0" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.72" />
        </linearGradient>
      </defs>
      <path
        d="M24 2l4 14 14-6-8 12 12 8-14 2-4 14-4-14-14 6 8-12-12-8 14-2z"
        fill={`url(#${id})`}
        stroke="rgba(201,169,110,0.45)"
        strokeWidth="0.85"
      />
    </svg>
  );
}

export function IconThread({ idPrefix }: { idPrefix: string }) {
  const id = `${idPrefix}-th`;
  return (
    <svg viewBox="0 0 56 56" fill="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a96e" />
          <stop offset="100%" stopColor="#8b5e7a" />
        </linearGradient>
      </defs>
      <path
        d="M8 40c10-18 28-22 40-8-6 10-20 14-32 8"
        stroke={`url(#${id})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M44 14c-8 2-14 10-12 18"
        stroke="rgba(232,213,163,0.5)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function IconInfinity({ idPrefix }: { idPrefix: string }) {
  const id = `${idPrefix}-inf`;
  return (
    <svg viewBox="0 0 64 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e8d5a3" />
          <stop offset="100%" stopColor="#c9a96e" />
        </linearGradient>
      </defs>
      <path
        d="M16 20c0-6 5-10 11-10 5 0 9 3 11 8 2-5 6-8 11-8 6 0 11 4 11 10s-5 10-11 10c-5 0-9-3-11-8-2 5-6 8-11 8-6 0-11-4-11-10z"
        stroke={`url(#${id})`}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small four-point star — craft / magic accent */
export function IconStar4({ idPrefix }: { idPrefix: string }) {
  const id = `${idPrefix}-st4`;
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8f0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <path
        d="M20 2l3.2 12.2L36 20l-12.8 5.8L20 38l-3.2-12.2L4 20l12.8-5.8L20 2z"
        fill={`url(#${id})`}
        stroke="rgba(201,169,110,0.4)"
        strokeWidth="0.7"
      />
    </svg>
  );
}

/** Crossing thread strands — “knot” motif */
export function IconThreadKnot({ idPrefix }: { idPrefix: string }) {
  const id = `${idPrefix}-kn`;
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5e7a" />
          <stop offset="100%" stopColor="#e8d5a3" />
        </linearGradient>
      </defs>
      <path
        d="M8 40c8-16 24-24 32-8M40 8c-8 16-24 24-32 8"
        stroke={`url(#${id})`}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="2.5" fill="rgba(201,169,110,0.55)" />
    </svg>
  );
}
