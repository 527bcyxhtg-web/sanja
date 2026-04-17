import Image from "next/image";
import styles from "./SectionVisualStrip.module.css";

export interface SectionStripImage {
  src: string;
  alt: string;
}

interface SectionVisualStripProps {
  images: SectionStripImage[];
  className?: string;
  /** Tighter spacing when nested under a subsection header */
  embedded?: boolean;
}

export default function SectionVisualStrip({
  images,
  className,
  embedded,
}: SectionVisualStripProps) {
  return (
    <div
      className={[
        styles.strip,
        embedded ? styles.stripEmbedded : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="presentation"
    >
      {images.map((im) => (
        <div key={im.src} className={styles.thumb}>
          <Image
            src={im.src}
            alt={im.alt}
            fill
            className={styles.img}
            sizes="(max-width: 600px) 42vw, 160px"
          />
        </div>
      ))}
    </div>
  );
}
