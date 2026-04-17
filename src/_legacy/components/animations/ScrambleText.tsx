"use client";

import { useState, useEffect } from "react";
import styles from "./ScrambleText.module.css";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: "mount" | "hover" | "inView";
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function ScrambleText({
  text,
  className = "",
  delay = 0,
  duration = 2000,
  trigger = "mount",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    const steps = 20;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      if (currentStep >= steps) {
        setDisplayText(text);
        setIsScrambling(false);
        clearInterval(interval);
        return;
      }

      const progress = currentStep / steps;
      const revealedCount = Math.floor(progress * text.length);

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < revealedCount) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(scrambled);
    }, stepDuration);
  };

  useEffect(() => {
    if (trigger === "mount") {
      const timer = setTimeout(scramble, delay);
      return () => clearTimeout(timer);
    }
  }, [text, delay, trigger]);

  return (
    <span
      className={`${styles.scrambleText} ${className}`}
      onMouseEnter={trigger === "hover" ? scramble : undefined}
    >
      {displayText}
    </span>
  );
}
