import type { SectionStripImage } from "@/components/ui/SectionVisualStrip";

export type TikTokReel = {
  video: string;
  poster: string;
  alt: string;
};

export const tiktokReels: TikTokReel[] = [
  {
    video: "/video/reels/reel-01.mp4",
    poster: "/social/reels/reel-01.webp",
    alt: "TikTok reel — ručno heklani plišanac u kratkom vertikalnom videu",
  },
  {
    video: "/video/reels/reel-02.mp4",
    poster: "/social/reels/reel-02.webp",
    alt: "TikTok reel — detalj heklanog proizvoda u vertikalnom kadru",
  },
  {
    video: "/video/reels/reel-03.mp4",
    poster: "/social/reels/reel-03.webp",
    alt: "TikTok reel — proces i gotov plišani lik",
  },
  {
    video: "/video/reels/reel-04.mp4",
    poster: "/social/reels/reel-04.webp",
    alt: "TikTok reel — prikaz ručno rađenog amigurumi lika",
  },
  {
    video: "/video/reels/reel-05.mp4",
    poster: "/social/reels/reel-05.webp",
    alt: "TikTok reel — plush kolekcija u kratkom videu",
  },
  {
    video: "/video/reels/reel-06.mp4",
    poster: "/social/reels/reel-06.webp",
    alt: "TikTok reel — završni detalji i prezentacija proizvoda",
  },
] as const;

export const tiktokStripImages: SectionStripImage[] = [
  {
    src: "/social/creator-with-plush-trio.webp",
    alt: "Sanja drži tri ručno heklana plišanca iz kolekcije",
  },
  ...tiktokReels.map((reel) => ({
    src: reel.poster,
    alt: reel.alt,
  })),
  {
    src: "/social/quotes/in-my-crochet-era.webp",
    alt: "Crochet quote grafika — In My Crochet Era",
  },
  {
    src: "/social/quotes/everyday-good-day-crochet.webp",
    alt: "Crochet quote grafika — Everyday is a good day to crochet",
  },
  {
    src: "/social/quotes/crochet-made-me-happy.webp",
    alt: "Crochet quote grafika — Crochet made me happy",
  },
  {
    src: "/social/quotes/make-handmade.webp",
    alt: "Crochet quote grafika — When life gives you hands, make handmade",
  },
  {
    src: "/social/quotes/when-in-doubt-crochet-it-out.webp",
    alt: "Crochet quote grafika — When in doubt, crochet it out",
  },
] as const;
