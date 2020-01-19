import { CELL_COLOUR } from '../colors';
import { BoardState, ChangedState } from './types';
import { RefObject } from 'react';
import getNextGeneration from './gameLogic';
import { playSoundNotes, playSoundChords } from "../sound";

export const getDrawFunctions = (
  canvasRef: RefObject<HTMLCanvasElement>,
  tileSize: number,
  isSoundOn: boolean
) => {
  const drawSquare = (x: number, y: number, alive: boolean) => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const actualSize = tileSize - 1;
    ctx.fillStyle = alive ? CELL_COLOUR.living : CELL_COLOUR.dead;

    if (!alive) {
      ctx.clearRect(x * tileSize, y * tileSize, actualSize, actualSize);
    }
    ctx.fillRect(x * tileSize, y * tileSize, actualSize, actualSize);
    /*if (alive && isSoundOn) playSound(x, y);*/
  };

  const drawFullBoard = (boardState: BoardState) => {
    boardState.forEach((row, y) => {
      row.forEach((alive, x) => {
        drawSquare(x, y, alive);
      });
    });
  };

  const drawHoverState = (hoverState: ChangedState[]) => {
    hoverState.forEach(({ y, x, alive }) => drawSquare(x, y, alive));
  };

  const drawNextGeneration = (boardState: BoardState) => {
    const coordinates: Array<[number, number]> = []
    getNextGeneration(boardState).forEach(({ y, x, alive }) => {
      boardState[y][x] = alive;
      drawSquare(x, y, alive);
      if (alive) {
        coordinates.push([x, y]);
      }
    });
    /* Can be replaced with playSoundNotes different effect*/
    playSoundNotes(coordinates, boardState.length, boardState[0].length);
  };

  return {
    drawNextGeneration,
    drawFullBoard,
    drawHoverState
  };
};
