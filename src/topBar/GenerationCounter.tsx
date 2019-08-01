import { useState } from "react";
import React from "react";
import styled from "styled-components";
import { defaultTick } from "./speedOptions";

const SpanLayout = styled.span`
  position: fixed;
  top: 10px;
  right: 75px;
`;

const GenerationLayout = styled.span`
  position: fixed;
  top: 10px;
  right: 10px;
`;
let currentTickTime = defaultTick;

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
    currentTickTime = tickTime;
    setGeneration(0);
    clearInterval(intervalId);
    setIntervalId(0);
  } else if (isPlaying && intervalId === 0) {
    setIntervalId(
      setInterval(() => setGeneration(generation => generation + 1), tickTime)
    );
  } else if (currentTickTime !== tickTime) {
    // speed change
    clearInterval(intervalId);
    currentTickTime = tickTime;
    setInterval(() => setGeneration(generation => generation + 1), tickTime);
  }
  return (
    <>
      <SpanLayout>Generation: </SpanLayout>
      <GenerationLayout>{generation}</GenerationLayout>
    </>
  );
};
