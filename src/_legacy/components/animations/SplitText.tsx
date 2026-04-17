"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "./SplitText.module.css";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  splitBy?: "chars" | "words" | "lines";
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.05,
  splitBy = "chars",
}: SplitTextProps) {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const items =
    splitBy === "chars"
      ? text.split("")
      : splitBy === "words"
      ? text.split(" ")
      : text.split("\n");

  return (
    <motion.span
      className={`${styles.splitText} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          className={styles.char}
          variants={itemVariants}
          style={{ display: "inline-block" }}
        >
          {item === " " ? "\u00A0" : item}
          {splitBy === "words" && index < items.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
}
