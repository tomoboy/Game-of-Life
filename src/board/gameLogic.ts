import { BoardState, ChangedState } from './types';
import { HISTORY_LENGTH } from '../consts';

const isAlive = (lifeStatus: boolean, numberOfLivingNeighbours: number) =>
  (!lifeStatus && numberOfLivingNeighbours === 3) ||
  (lifeStatus &&
    (numberOfLivingNeighbours === 3 || numberOfLivingNeighbours === 2));

export const getNextGeneration = (
  { currentBoard, history, heatMap }: BoardState,
  generation: number
) => {
  const wrapRow1 = (i: number) => (i > 0 ? i - 1 : currentBoard.length - 1);
  const wrapRow2 = (i: number) => (i === currentBoard.length - 1 ? 0 : i + 1);
  const wrapCol1 = (j: number) => (j > 0 ? j - 1 : currentBoard[0].length - 1);
  const wrapCol2 = (j: number) =>
    j === currentBoard[0].length - 1 ? 0 : j + 1;
  const board = (i: number, j: number) => currentBoard[i][j];
  const over = (i: number, j: number) => board(wrapRow1(i), j);
  const leftOver = (i: number, j: number) => board(wrapRow1(i), wrapCol1(j));
  const rightOver = (i: number, j: number) => board(wrapRow1(i), wrapCol2(j));
  const under = (i: number, j: number) => board(wrapRow2(i), j);
  const leftUnder = (i: number, j: number) => board(wrapRow2(i), wrapCol1(j));
  const rightUnder = (i: number, j: number) => board(wrapRow2(i), wrapCol2(j));
  const left = (i: number, j: number) => board(i, wrapCol1(j));
  const right = (i: number, j: number) => board(i, wrapCol2(j));

  const neighbourFunctions = [
    over,
    leftOver,
    rightOver,
    under,
    leftUnder,
    rightUnder,
    left,
    right
  ];
  const changes: ChangedState[] = [];
  const newBoard = history[generation % HISTORY_LENGTH];
  currentBoard.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      const lifeStatus = isAlive(
        cell,
        neighbourFunctions.reduce(
          (total, neighbourFunc) =>
            neighbourFunc(rowIndex, colIndex) ? total + 1 : total,
          0
        )
      );
      if (
        lifeStatus !== cell ||
        heatMap[rowIndex][colIndex] ||
        currentBoard[rowIndex][colIndex]
      ) {
        changes.push({ y: rowIndex, x: colIndex, alive: lifeStatus });
      }
      newBoard[rowIndex][colIndex] = lifeStatus;
    })
  );

  return { currentBoard: newBoard, history, changes };
};
