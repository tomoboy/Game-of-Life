import React, { MouseEvent, useEffect, useState } from "react";
import { CELL_COLOUR } from "../colors";
import { BoardState, ChangedState } from "./types";
import { AppState } from "../types";
import { connect } from "../streamUtils";
import { appSettings$ } from "../AppSettings$";
import styled from "styled-components";
import getNextGeneration from "./gameLogic";

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

const Margins = styled.div`
  margin: 50px;
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
  const [previewState, setPreviewState] = useState<ChangedState[]>([]);

  if (!boardState) {
    boardState = createEmptyBoardState(rows, columns);
  }
  const getColour = (alive: boolean) => {
    if (alive) {
      return CELL_COLOUR.living;
    }
    if (!isPlaying) {
      return CELL_COLOUR.setup;
    }
    return CELL_COLOUR.dead;
  };

  const drawSquare = ({
    rowIndex,
    colIndex,
    alive,
    ctx
  }: {
    rowIndex: number;
    colIndex: number;
    alive: boolean;
    ctx: CanvasRenderingContext2D;
  }) => {
    const actualSize = tileSize - 1;
    ctx.fillStyle = getColour(alive);
    ctx.fillRect(
      rowIndex * tileSize,
      colIndex * tileSize,
      actualSize,
      actualSize
    );
  };

  const changesDifferentFromBoard = (changes: ChangedState[]) =>
    changes
      .filter(
        ({ rowIndex, colIndex, alive }) =>
          alive !== boardState[rowIndex][colIndex]
      )
      .map(({ rowIndex, colIndex }) => ({
        rowIndex,
        colIndex,
        alive: boardState[rowIndex][colIndex]
      }));

  const createPreviewState = (x: number, y: number) => {
    const startI = x - selectedShape.xMin;
    const startJ = y - selectedShape.yMin;
    const newPreviewState = changesDifferentFromBoard(previewState);

    for (let i = startI, row = 0; i < startI + selectedShape.rows; i++, row++)
      for (
        let j = startJ, column = 0;
        j < startJ + selectedShape.columns;
        j++, column++
      ) {
        const ii = wrap(i, rows);
        const jj = wrap(j, columns);
        const existingChangeIndex = newPreviewState.findIndex(
          ({ rowIndex, colIndex }) => ii === rowIndex && jj === colIndex
        );
        if (
          existingChangeIndex >= 0 &&
          typeof newPreviewState[existingChangeIndex] !== "undefined"
        ) {
          newPreviewState[existingChangeIndex].alive =
            selectedShape.pattern[row][column];
        } else {
          newPreviewState.push({
            rowIndex: ii,
            colIndex: jj,
            alive: selectedShape.pattern[row][column]
          });
        }
      }
    setPreviewState(newPreviewState);
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
      createPreviewState(curX, curY);
      lastX = curX;
      lastY = curY;
    }
  };
  const removePreview = () => {
    setPreviewState([]);
  };

  const onClick = () => {
    previewState.forEach(
      ({ rowIndex, colIndex, alive }) =>
        (boardState[rowIndex][colIndex] = alive)
    );
  };
  const tick = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    getNextGeneration(boardState).forEach(({ rowIndex, colIndex, alive }) => {
      boardState[rowIndex][colIndex] = alive;
      drawSquare({ rowIndex, colIndex, alive, ctx });
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (isPlaying && !intervalId) {
      intervalId = setInterval(tick, tickTime);
    } else if (!isPlaying && intervalId) {
      clearInterval(intervalId);
      intervalId = 0;
    } else if (previewState.length) {
      previewState.forEach(({ rowIndex, colIndex, alive }) =>
        drawSquare({ rowIndex, colIndex, alive, ctx })
      );
    } else {
      boardState.forEach((row, rowIndex) => {
        row.forEach((alive, colIndex) => {
          drawSquare({ rowIndex, colIndex, alive, ctx });
        });
      });
    }
  });

  return (
    <Margins>
      <canvas
        id="boardCanvas"
        ref={canvasRef}
        width={columns * tileSize}
        height={rows * tileSize}
        onMouseMove={handleMouse}
        onMouseLeave={removePreview}
        onClick={() => {
          if (!isPlaying) {
            onClick();
          }
        }}
      />
    </Margins>
  );
};

export default connect(
  Board,
  appSettings$
);
