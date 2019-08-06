import { useEffect, useState } from "react";
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
let intervalId = 0;
export const GenerationCounter = ({
  isPlaying,
  tickTime
}: {
  isPlaying: boolean;
  tickTime: number;
}) => {
  const [generation, setGeneration] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying && generation > 0) {
      currentTickTime = tickTime;
      clearInterval(intervalId);
      intervalId = 0;
    } else if (isPlaying && intervalId === 0) {
      setGeneration(0);
      intervalId = setInterval(
        () => setGeneration(generation => generation + 1),
        tickTime
      );
    } else if (currentTickTime !== tickTime) {
      // speed change
      clearInterval(intervalId);
      currentTickTime = tickTime;
      intervalId = setInterval(
        () => setGeneration(generation => generation + 1),
        tickTime
      );
    }
    return () => {
      clearInterval(intervalId);
      intervalId = 0;
    }; // eslint-disable-next-line
  }, [isPlaying, tickTime]);
  return (
    <>
      <SpanLayout>Generation: </SpanLayout>
      <GenerationLayout>{generation}</GenerationLayout>
    </>
  );
};
