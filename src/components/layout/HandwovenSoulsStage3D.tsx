"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useDailyPlushOracle } from "@/hooks/useDailyPlushOracle";
import { ORACLE_POSITIONS } from "@/lib/plushOracle";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./HandwovenSoulsStage3D.module.css";

const DAILY_LABEL = new Intl.DateTimeFormat("hr-HR", {
  day: "numeric",
  month: "long",
}).format(new Date());

export default function HandwovenSoulsStage3D() {
  const { cards, story, canDraw, drawCards, isLoading } = useDailyPlushOracle();
  const reducedMotion = useReducedMotion();
  const [revealedCount, setRevealedCount] = useState(cards.length ? 3 : 0);

  useEffect(() => {
    if (!cards.length || !isLoading) return;

    if (reducedMotion) {
      const instant = window.setTimeout(() => setRevealedCount(3), 0);
      return () => window.clearTimeout(instant);
    }

    const timeouts = [0, 1, 2].map((index) =>
      window.setTimeout(() => {
        setRevealedCount(index + 1);
      }, 220 + index * 180)
    );

    return () => timeouts.forEach((timeout) => window.clearTimeout(timeout));
  }, [cards, reducedMotion, isLoading]);

  const storyParagraphs = useMemo(
    () => story.split(/\n\n+/).map((chunk) => chunk.trim()).filter(Boolean),
    [story]
  );

  const handleDraw = () => {
    if (!canDraw || isLoading) return;
    setRevealedCount(0);
    drawCards();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.canvasWrap}>
        <div className={styles.panelTop}>
          <div>
            <p className={styles.kicker}>Daily Plush Oracle</p>
            <h3 className={styles.title}>Tri karte. Jedna dnevna prica.</h3>
          </div>
          <div className={styles.dateChip}>{DAILY_LABEL}</div>
        </div>

        <div className={`${styles.deck} ${isLoading ? styles.deckLoading : ""}`}>
          {ORACLE_POSITIONS.map((position, index) => {
            const card = cards[index];
            const isRevealed = Boolean(card) && index < revealedCount;

            return (
              <article
                key={position.title}
                className={`${styles.oracleCard} ${isRevealed ? styles.oracleCardRevealed : ""}`}
              >
                <div className={styles.cardAura} aria-hidden />
                {card ? (
                  <>
                    <div className={styles.cardHead}>
                      <div>
                        <p className={styles.positionLabel}>{position.title}</p>
                        <p className={styles.positionSub}>{position.subtitle}</p>
                      </div>
                      <span className={styles.seal}>{card.oracleSeal}</span>
                    </div>

                    <div className={styles.figureWrap}>
                      <Image
                        src={card.oracleImage}
                        alt={card.name}
                        fill
                        sizes="(max-width: 768px) 80vw, 280px"
                        className={styles.figure}
                      />
                    </div>

                    <div className={styles.cardBody}>
                      <p className={styles.cardTag}>{card.tag}</p>
                      <h4 className={styles.cardName}>{card.name}</h4>
                      <p className={styles.cardDesc}>{card.storyLine || card.desc}</p>
                    </div>
                  </>
                ) : (
                  <div className={styles.cardBack}>
                    <span className={styles.cardBackIndex}>0{index + 1}</span>
                    <p className={styles.cardBackTitle}>{position.title}</p>
                    <p className={styles.cardBackBody}>
                      Spil ceka tvoj dnevni odabir. Kad okrenes karte, otvaraju se samo jednom.
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <div className={styles.ui}>
        <p className={styles.hint}>Rucno ispleten dnevni ritual</p>
        <p className={styles.body}>
          Igrica s tri kuglice sada je zamijenjena tarot-like setom plush karata. Svaki dan mozes
          otvoriti samo jedno izvlacenje od tri karte: proslost, sadasnjost i buducnost.
        </p>

        <button
          type="button"
          className={styles.drawBtn}
          onClick={handleDraw}
          disabled={!canDraw || isLoading}
        >
          {isLoading ? "Otvaram dnevne karte..." : canDraw ? "Izvuci 3 karte" : "Danasnje karte su otvorene"}
        </button>

        {!canDraw && cards.length ? (
          <div className={styles.lockBanner} role="status" aria-live="polite">
            Danasnje izvlacenje je zakljucano do ponoci. Sutra te ceka novi raspored niti.
          </div>
        ) : null}

        <div className={styles.storyPanel} aria-live="polite">
          <div className={styles.storyHeader}>
            <span className={styles.storyEyebrow}>Prica dana</span>
            <span className={styles.storyMeta}>Past / Present / Future</span>
          </div>

          {storyParagraphs.length ? (
            storyParagraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 24)}`} className={styles.storyParagraph}>
                {paragraph}
              </p>
            ))
          ) : (
            <p className={styles.storyPlaceholder}>
              Kad otvoris dnevni raspored, karte ce povezati tri plush lika u malu pricu koja traje
              samo danas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
