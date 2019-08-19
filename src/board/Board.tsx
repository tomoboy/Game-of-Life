import React, { MouseEvent, useEffect, useState } from "react";
import { BoardState, ChangedState } from "./types";
import { AppState } from "../types";
import { connect } from "../streams/streamUtils";
import { appSettings$, defaultTileSize } from "../streams/AppSettings$";
import { dispatchAction } from "../streams/baseStream$";
import { setNewGame } from "../actions/appActions";
import { defaultTick } from "../topBar/speedOptions";
import { GenerationCounter } from "./GenerationCounter";
import { createEmptyBoardState, createNextHoverState } from "./utils";
import { getDrawFunctions } from "./drawFunctions";
import { Wrapper } from "./BoardWrapper";

let boardState: BoardState;
let [lastX, lastY, currentTickTime, currentTileSize] = [
  0,
  0,
  defaultTick,
  defaultTileSize
];

const Board = ({
  tileSize,
  isPlaying,
  rows,
  columns,
  newGame,
  selectedShape,
  tickTime,
  isSoundOn
}: AppState) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [hoverState, setHoverState] = useState<ChangedState[]>([]);
  const [[screenWidth, screenHeight], setScreenSize] = useState<
    [number, number]
  >([window.innerWidth, window.innerHeight]);

  const [generation, setGeneration] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number>(0);

  if (!boardState) {
    boardState = createEmptyBoardState(rows, columns);
  }

  const handleMouse = (e: MouseEvent<HTMLCanvasElement>) => {
    if (isPlaying) {
      return;
    }
    const canvas = canvasRef.current as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const curX = (offsetX - (offsetX % tileSize)) / tileSize;
    const curY = (offsetY - (offsetY % tileSize)) / tileSize;
    if (
      !isPlaying &&
      (curX !== lastX || curY !== lastY) &&
      curX < columns &&
      curY < rows
    ) {
      setHoverState(
        createNextHoverState(
          curX,
          curY,
          rows,
          columns,
          selectedShape,
          boardState,
          hoverState
        )
      );
      lastX = curX;
      lastY = curY;
    }
  };
  const removeHoverState = () => {
    if (!isPlaying) setHoverState([]);
  };

  const screenSizeChangeHandler = () => {
    if (
      window.innerWidth !== screenWidth ||
      window.innerHeight !== screenHeight
    ) {
      setScreenSize([window.innerWidth, window.innerHeight]);
    }
  };

  const {
    drawFullBoard,
    drawHoverState,
    drawNextGeneration
  } = getDrawFunctions(canvasRef, tileSize, isSoundOn);

  useEffect(() => {
    if (newGame) {
      boardState = createEmptyBoardState(rows, columns);
      drawFullBoard(boardState);
      removeHoverState();
      dispatchAction(setNewGame({ newGame: false }));
    } else {
      drawFullBoard(boardState);
    }
    // eslint-disable-next-line
  }, [newGame]);

  useEffect(() => {
    if (hoverState.length) {
      drawHoverState(hoverState);
    } else {
      drawFullBoard(boardState);
    }
    // eslint-disable-next-line
  }, [hoverState]);

  useEffect(() => {
    if (generation > 0) {
      drawNextGeneration(boardState);
    } // eslint-disable-next-line
  }, [generation]);

  useEffect(() => {
    const startGame = () =>
      setIntervalId(
        setInterval(() => setGeneration(generation => generation + 1), tickTime)
      );

    if (isPlaying && !intervalId) {
      startGame();
    } else if (!isPlaying && intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    } else if (isPlaying && intervalId && currentTickTime !== tickTime) {
      //speed change
      clearInterval(intervalId);
      currentTickTime = tickTime;
      startGame();
    } else if (currentTileSize !== tileSize) {
      // Zoom level changed
      if (isPlaying && intervalId) {
        clearInterval(intervalId);
      }
      currentTileSize = tileSize;
      drawFullBoard(boardState);
      if (isPlaying) {
        startGame();
      }
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [isPlaying, tileSize, tickTime]);

  useEffect(() => {
    window.addEventListener("resize", screenSizeChangeHandler);
    return () => window.removeEventListener("resize", screenSizeChangeHandler);
  });

  return (
    <Wrapper width={screenWidth} height={screenHeight}>
      <GenerationCounter generation={generation} />
      <canvas
        id="boardCanvas"
        ref={canvasRef}
        width={columns * tileSize}
        height={rows * tileSize}
        onMouseMove={handleMouse}
        onMouseLeave={removeHoverState}
        onClick={() => {
          if (!isPlaying) {
            hoverState.forEach(({ y, x, alive }) => (boardState[y][x] = alive));
          }
        }}
      />
    </Wrapper>
  );
};

export default connect(
  Board,
  appSettings$
);
