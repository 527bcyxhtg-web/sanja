"use client";

import styles from "./Marquee.module.css";

const items = [
  "Handmade with Love",
  "Premium Yarn",
  "Live on TikTok",
  "Unique Creations",
  "Novi Sad, Serbia",
  "One of a Kind",
  "Crochet Artistry",
  "Made to Order",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item} <span className={styles.sep}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
