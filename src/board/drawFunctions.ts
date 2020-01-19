import { CELL_COLOUR } from '../colors';
import { BoardState, ChangedState } from './types';
import { RefObject } from 'react';
import getNextGeneration from './gameLogic';
import { playSoundChords } from '../sound';

const drawSquare = (
  canvasRef: RefObject<HTMLCanvasElement>,
  tileSize: number,
  x: number,
  y: number,
  alive: boolean
) => {
  const canvas = canvasRef.current as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const actualSize = tileSize - 1;
  ctx.fillStyle = alive ? CELL_COLOUR.living : CELL_COLOUR.dead;

  if (!alive) {
    ctx.clearRect(x * tileSize, y * tileSize, actualSize, actualSize);
  }
  ctx.fillRect(x * tileSize, y * tileSize, actualSize, actualSize);
};

type DrawFunction = ({
  canvasRef,
  tileSize,
  boardState,
  isSoundOn,
  generation,
  hoverState
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  tileSize: number;
  boardState: BoardState;
  isSoundOn: boolean;
  generation: number;
  hoverState?: ChangedState[];
}) => void;

export const drawNextGeneration: DrawFunction = ({
  canvasRef,
  tileSize,
  boardState,
  isSoundOn,
  generation
}) => {
  const coordinates: Array<[number, number]> = [];
  getNextGeneration(boardState).forEach(({ y, x, alive }) => {
    boardState[y][x] = alive;
    drawSquare(canvasRef, tileSize, x, y, alive);
    if (alive) {
      coordinates.push([x, y]);
    }
  });
  /* Can be replaced with playSoundNotes different effect*/
  isSoundOn &&
    playSoundChords(
      coordinates,
      boardState.length,
      boardState[0].length,
      generation
    );
};

export const drawFullBoard: DrawFunction = ({
  canvasRef,
  tileSize,
  boardState
}) => {
  boardState.forEach((row, y) => {
    row.forEach((alive, x) => {
      drawSquare(canvasRef, tileSize, x, y, alive);
    });
  });
};

export const drawHoverState: DrawFunction = ({
  canvasRef,
  tileSize,
  hoverState = []
}) => {
  hoverState.forEach(({ y, x, alive }) =>
    drawSquare(canvasRef, tileSize, x, y, alive)
  );
};
