import React, { MouseEvent, useEffect, useState } from "react";
import { CELL_COLOUR } from "../colors";
import { BoardState, ChangedState } from "./types";
import { dispatchAction } from "../baseStream$";
import { removePreview, tileHover } from "./actions";
import createEmptyBoardState from "../createEmptyBoardState";
import { Shape } from "../types";
import { connect } from "../streamUtils";
import { appSettings$ } from "../AppSettings$";
import { setNewGame } from "../actions/appActions";
import styled from "styled-components";

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

const BoardCanvas = ({
  tileSize,
  isPlaying,
  rows,
  columns,
  newGame,
  selectedShape
}: {
  tileSize: number;
  isPlaying: boolean;
  rows: number;
  columns: number;
  newGame: boolean;
  selectedShape: Shape;
}) => {
  const canvasRef = React.createRef<HTMLCanvasElement>();
  const [lastX, setLastX] = useState<number>(0);
  const [lastY, setLastY] = useState<number>(0);
  const [boardState, setBoardState] = useState<BoardState>(
    createEmptyBoardState(rows, columns)
  );
  const [previewState, setPreviewState] = useState<ChangedState[]>([]);

  if (newGame) {
    dispatchAction(setNewGame({ newGame: false }));
    setBoardState(createEmptyBoardState(rows, columns));
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
    alive
  }: {
    rowIndex: number;
    colIndex: number;
    alive: boolean;
  }) => {
    const actualSize = isPlaying ? tileSize : tileSize - 1;
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = getColour(alive);
    ctx.fillRect(
      rowIndex * tileSize,
      colIndex * tileSize,
      actualSize,
      actualSize
    );
  };

  const createPreviewState = (x: number, y: number) => {
    const startI = x - selectedShape.xMin;
    const startJ = y - selectedShape.yMin;
    const newPreviewState = previewState
      .filter(
        ({ rowIndex, colIndex, alive }) =>
          boardState[rowIndex][colIndex] !== alive
      )
      .map(({ rowIndex, colIndex }) => ({
        rowIndex,
        colIndex,
        alive: boardState[rowIndex][colIndex]
      }));

    for (let i = startI, row = 0; i < startI + selectedShape.rows; i++, row++)
      for (
        let j = startJ, column = 0;
        j < startJ + selectedShape.columns;
        j++, column++
      ) {
        const ii = wrap(i, rows);
        const jj = wrap(j, columns);
        const existingChangeIndex = previewState.findIndex(
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

  useEffect(() => {
    if (previewState.length) {
      previewState.forEach(drawSquare);
    } else {
      boardState.forEach((row, rowIndex) => {
        row.forEach((alive, colIndex) => {
          drawSquare({ rowIndex, colIndex, alive });
        });
      });
    }
  });

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
      setLastX(curX);
      setLastY(curY);
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
  BoardCanvas,
  appSettings$
);
