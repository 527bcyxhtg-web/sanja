"use client";

import { useEffect, useState } from "react";
import { getAllPlushCards, generateOracleStory, type PlushCard } from "@/lib/plushOracle";

type DailyPlushOracleState = {
  canDraw: boolean;
  cards: PlushCard[];
  story: string;
};

const getInitialOracleState = (): DailyPlushOracleState => {
  if (typeof window === "undefined") {
    return { cards: [], story: "", canDraw: true };
  }

  const today = new Date().toDateString();
  const lastDate = localStorage.getItem("dailyDrawDate");
  const savedCards = localStorage.getItem("dailyPlushCards");
  const savedStory = localStorage.getItem("dailyStory");

  if (lastDate !== today || !savedCards || !savedStory) {
    return { cards: [], story: "", canDraw: true };
  }

  try {
    return {
      cards: JSON.parse(savedCards) as PlushCard[],
      story: savedStory,
      canDraw: false,
    };
  } catch {
    return { cards: [], story: "", canDraw: true };
  }
};

export const useDailyPlushOracle = () => {
  const [initialState] = useState(getInitialOracleState);
  const [cards, setCards] = useState<PlushCard[]>(initialState.cards);
  const [story, setStory] = useState(initialState.story);
  const [isLoading, setIsLoading] = useState(false);
  const [canDraw, setCanDraw] = useState(initialState.canDraw);

  const drawCards = () => {
    if (!canDraw || isLoading) return;

    setIsLoading(true);
    const allCards = getAllPlushCards();
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    const newStory = generateOracleStory(selected);

    setCards(selected);
    setStory(newStory);
    setCanDraw(false);

    // Save to localStorage
    localStorage.setItem("dailyDrawDate", new Date().toDateString());
    localStorage.setItem("dailyPlushCards", JSON.stringify(selected));
    localStorage.setItem("dailyStory", newStory);

    setTimeout(() => setIsLoading(false), 1500);
  };

  useEffect(() => {
    const syncWithToday = () => {
      const next = getInitialOracleState();
      setCards(next.cards);
      setStory(next.story);
      setCanDraw(next.canDraw);
    };

    window.addEventListener("focus", syncWithToday);
    document.addEventListener("visibilitychange", syncWithToday);

    return () => {
      window.removeEventListener("focus", syncWithToday);
      document.removeEventListener("visibilitychange", syncWithToday);
    };
  }, []);

  return { cards, story, canDraw, drawCards, isLoading };
};
