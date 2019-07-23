import { useState } from "react";
import React from "react";

export const GenerationCounter = ({
  isPlaying,
  tickTime
}: {
  isPlaying: boolean;
  tickTime: number;
}) => {
  const [generation, setGeneration] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number>(0);
  if (!isPlaying && generation > 0) {
    setGeneration(0);
    clearInterval(intervalId);
    setIntervalId(0);
  } else if (isPlaying && intervalId === 0) {
    setIntervalId(
      setInterval(() => setGeneration(generation => generation + 1), tickTime)
    );
  }
  return <span>Generation: {generation}</span>;
};
