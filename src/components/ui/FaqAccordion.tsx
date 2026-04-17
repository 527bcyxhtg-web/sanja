"use client";

import styles from "./FaqAccordion.module.css";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const DEFAULT_ITEMS: FaqItem[] = [
  {
    id: "order",
    question: "Kako naručiti ako nisam bila na uživo?",
    answer:
      "Odaberi komad na sajtu, klikni „Pogledaj priču“ za detalje, pa „U korpu“. Poruku ili formu u kontaktu koristi za nijanse, mašnu i rok — Sanja potvrđuje pre nego što krene šav.",
  },
  {
    id: "live",
    question: "Šta znači „rođen uživo“?",
    answer:
      "To su komadi čiji su ključni koraci radjeni dok kamera snima — vidiš iste ruke, isti sto, isti Novi Sad. Nije šou za šou: transparentnost da znaš odakle saputnik dolazi.",
  },
  {
    id: "tiktok",
    question: "Mora li TikTok da bih naručila?",
    answer:
      "Ne mora, ali uživo je najbrži način da „uhvatiš“ komad u nastajanju i da pitaš u chatu. Ako ti više odgovara mirno listanje, istaknuti favoriti su tu isti kvalitet, samo završena priča.",
  },
  {
    id: "delivery",
    question: "Dostava i plaćanje",
    answer:
      "Dogovor po poruci: šaljemo u region i dalje kada se sve uskladi. „U korpu“ na sajtu trenutno rezerviše nameru — finalni način plaćanja i kurir potvrđujemo u prepisci (bez automatskog checkouta).",
  },
  {
    id: "time",
    question: "Koliko traje izrada?",
    answer:
      "Zavisi od komada i reda. Na kartici piše okvir (npr. 40+ sati za složene). Uživo termini: ponedjeljak, srijeda i petak u 20:00 CET — tamo najčešće dobiješ i najkraći odgovor „kada tvoj red“.",
  },
];

interface FaqAccordionProps {
  className?: string;
  items?: FaqItem[];
}

export default function FaqAccordion({ className, items = DEFAULT_ITEMS }: FaqAccordionProps) {
  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      <h3 className={styles.heading}>Česta pitanja</h3>
      <p className={styles.sub}>
        Kratak vodič kroz narudžbu, TikTok i dostavu — sve na jednom mjestu.
      </p>
      <div className={styles.list}>
        {items.map((item) => (
          <details key={item.id} className={styles.item}>
            <summary className={styles.summary}>{item.question}</summary>
            <div className={styles.answer}>{item.answer}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
