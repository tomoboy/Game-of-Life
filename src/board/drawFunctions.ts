import { CELL_COLOUR, getColor } from '../colors';
import { BoardState, ChangedState } from './types';
import { RefObject } from 'react';
import { playSoundChords } from '../sound';
import { getCellsToPlaySound } from '../board/noteSelector';

const drawSquare = (
  canvasRef: RefObject<HTMLCanvasElement>,
  tileSize: number,
  x: number,
  y: number,
  alive: boolean,
  freq: number,
  soundSquare?: boolean
) => {
  const canvas = canvasRef.current as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const actualSize = tileSize - 1;
  ctx.fillStyle = alive ? getColor(freq, soundSquare) : CELL_COLOUR.dead;
  ctx.clearRect(x * tileSize, y * tileSize, actualSize, actualSize);
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
  changes?: ChangedState[];
  hoverState?: ChangedState[];
}) => void;

export const drawNextGeneration: DrawFunction = ({
  canvasRef,
  tileSize,
  boardState: { heatMap, currentBoard },
  isSoundOn,
  generation,
  changes
}) => {
  const cellsToPlaySoundsFrom = getCellsToPlaySound(heatMap);

  changes!.forEach(({ y, x, alive }) => {
    drawSquare(
      canvasRef,
      tileSize,
      x,
      y,
      alive ||
        Boolean(
          cellsToPlaySoundsFrom.find(
            ([targetY, targetX]) => y === targetY && x === targetX
          )
        ),
      heatMap[y][x],
      Boolean(
        cellsToPlaySoundsFrom.find(
          ([targetY, targetX]) => y === targetY && x === targetX
        )
      )
    );
  });

  /* Can be replaced with playSoundNotes different effect*/
  isSoundOn &&
    playSoundChords(
      cellsToPlaySoundsFrom,
      currentBoard.length,
      currentBoard[0].length,
      generation
    );
};

export const drawFullBoard: DrawFunction = ({
  canvasRef,
  tileSize,
  boardState: { currentBoard, heatMap }
}) => {
  currentBoard.forEach((row, y) => {
    row.forEach((alive, x) => {
      drawSquare(canvasRef, tileSize, x, y, alive, heatMap[y][x]);
    });
  });
};

export const drawHoverState: DrawFunction = ({
  canvasRef,
  tileSize,
  hoverState = []
}) => {
  hoverState.forEach(({ y, x, alive }) =>
    drawSquare(canvasRef, tileSize, x, y, alive, 1)
  );
};
