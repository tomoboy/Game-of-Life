import React, { MouseEvent, useEffect, useState } from "react";
import { CELL_COLOUR } from "../colors";
import { BoardState, ChangedState } from "./types";
import { AppState } from "../types";
import { connect } from "../streamUtils";
import { appSettings$ } from "../AppSettings$";
import styled from "styled-components";
import getNextGeneration from "./gameLogic";
import { dispatchAction } from "../baseStream$";
import { setNewGame } from "../actions/appActions";

const createEmptyBoardState = (rows: number, columns: number) =>
  new Array(rows).fill(false).map(() => new Array(columns).fill(false));

const wrap = (index: number, limit: number) => {
  if (index < 0) {
    return limit + index;
  }
  if (index >= limit) {
    return index - limit;
  }
  return index;
};

const Padding = styled.div`
  padding: 20px;
`;

let boardState: BoardState;
let intervalId = 0;
let lastX = 0;
let lastY = 0;

const Board = ({
  tileSize,
  isPlaying,
  rows,
  columns,
  newGame,
  selectedShape,
  tickTime
}: AppState) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [hoverState, setHoverState] = useState<ChangedState[]>([]);

  if (!boardState) {
    boardState = createEmptyBoardState(rows, columns);
  }

  const drawSquare = ({
    x,
    y,
    alive,
    ctx
  }: {
    x: number;
    y: number;
    alive: boolean;
    ctx: CanvasRenderingContext2D;
  }) => {
    const actualSize = tileSize - 1;
    ctx.fillStyle = alive ? CELL_COLOUR.living : CELL_COLOUR.dead;
    if (!alive) {
      ctx.clearRect(x * tileSize, y * tileSize, actualSize, actualSize);
    }
    ctx.fillRect(x * tileSize, y * tileSize, actualSize, actualSize);
  };

  const changesDifferentFromBoard = (changes: ChangedState[]) =>
    changes
      .filter(({ y, x, alive }) => alive !== boardState[y][x])
      .map(({ y, x }) => ({
        y,
        x,
        alive: boardState[y][x]
      }));

  const createHoverState = (curX: number, curY: number) => {
    const startX = curX - selectedShape.xMin;
    const startY = curY - selectedShape.yMin;
    const newHoverState = changesDifferentFromBoard(hoverState);

    for (let y = startY, row = 0; y < startY + selectedShape.rows; y++, row++)
      for (
        let x = startX, column = 0;
        x < startX + selectedShape.columns;
        x++, column++
      ) {
        const wrappedX = wrap(x, columns);
        const wrappedY = wrap(y, rows);
        const existingChangeIndex = newHoverState.findIndex(
          ({ x, y }) => wrappedX === x && wrappedY === y
        );
        if (
          existingChangeIndex >= 0 &&
          typeof newHoverState[existingChangeIndex] !== "undefined"
        ) {
          newHoverState[existingChangeIndex].alive =
            selectedShape.pattern[row][column];
        } else {
          newHoverState.push({
            y: wrappedY,
            x: wrappedX,
            alive: selectedShape.pattern[row][column]
          });
        }
      }
    setHoverState(newHoverState);
  };

  const handleMouse = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const offsetY = e.pageY - ctx.canvas.offsetTop;
    const offsetX = e.pageX - ctx.canvas.offsetLeft;

    const curX = (offsetX - (offsetX % tileSize)) / tileSize;
    const curY = (offsetY - (offsetY % tileSize)) / tileSize;
    if (
      !isPlaying &&
      (curX !== lastX || curY !== lastY) &&
      curX < columns &&
      curY < rows
    ) {
      createHoverState(curX, curY);
      lastX = curX;
      lastY = curY;
    }
  };
  const removeHoverState = () => {
    setHoverState([]);
  };

  const onClick = () => {
    hoverState.forEach(({ y, x, alive }) => (boardState[y][x] = alive));
  };
  const tick = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    getNextGeneration(boardState).forEach(({ y, x, alive }) => {
      boardState[y][x] = alive;
      drawSquare({ y, x, alive, ctx });
    });
  };

  const drawFullBoard = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    boardState.forEach((row, y) => {
      row.forEach((alive, x) => {
        drawSquare({ y, x, alive, ctx });
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (newGame) {
      boardState = createEmptyBoardState(rows, columns);
      drawFullBoard();
      removeHoverState();
      dispatchAction(setNewGame({ newGame: false }));
    } else if (isPlaying && !intervalId) {
      intervalId = setInterval(tick, tickTime);
    } else if (!isPlaying && intervalId) {
      clearInterval(intervalId);
      intervalId = 0;
    } else if (hoverState.length) {
      hoverState.forEach(({ y, x, alive }) => drawSquare({ y, x, alive, ctx }));
    } else {
      drawFullBoard();
    }
  });
  console.log("rendering board");
  return (
    <Padding>
      <canvas
        id="boardCanvas"
        ref={canvasRef}
        width={columns * tileSize}
        height={rows * tileSize}
        onMouseMove={handleMouse}
        onMouseLeave={removeHoverState}
        onClick={() => {
          if (!isPlaying) {
            onClick();
          }
        }}
      />
    </Padding>
  );
};

export default connect(
  Board,
  appSettings$
);
