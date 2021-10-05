import { Shape } from '../types';
import { BoardState, ChangedState, HeatMap, LifeStatus } from './types';
import { HISTORY_LENGTH } from '../consts';

const createBoard = <T>(rows: number, columns: number, value: T) =>
  new Array(rows).fill(false).map(() => new Array(columns).fill(value));

export const createEmptyBoardState = (
  rows: number,
  columns: number
): BoardState => {
  const firstGeneration = createBoard<boolean>(rows, columns, false);
  const heatMap = createBoard<number>(rows, columns, 0);
  const history = [
    firstGeneration,
    ...Array.from(Array(HISTORY_LENGTH - 1), () =>
      createBoard<boolean>(rows, columns, false)
    )
  ];
  return { currentBoard: firstGeneration, heatMap, history };
};

const wrap = (index: number, limit: number) => {
  if (index < 0) {
    return limit + index;
  }
  if (index >= limit) {
    return index - limit;
  }
  return index;
};
const changesDifferentFromBoard = (
  changes: ChangedState[],
  { currentBoard }: BoardState
) =>
  changes
    .filter(({ y, x, alive }) => alive !== currentBoard[y][x])
    .map(({ y, x }) => ({
      y,
      x,
      alive: currentBoard[y][x]
    }));

export const createNextHoverState = (
  curX: number,
  curY: number,
  rows: number,
  columns: number,
  selectedShape: Shape,
  boardState: BoardState,
  hoverState: ChangedState[]
): ChangedState[] => {
  const startX = curX - selectedShape.xMin;
  const startY = curY - selectedShape.yMin;
  const newHoverState = changesDifferentFromBoard(hoverState, boardState);

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
        typeof newHoverState[existingChangeIndex] !== 'undefined' &&
        selectedShape.pattern[row][column]
      ) {
        newHoverState[existingChangeIndex].alive =
          selectedShape.pattern[row][column];
      } else if (selectedShape.pattern[row][column]) {
        newHoverState.push({
          y: wrappedY,
          x: wrappedX,
          alive: selectedShape.pattern[row][column]
        });
      }
    }
  return newHoverState;
};

export const getHeatMap = ({ history }: BoardState): HeatMap =>
  history.reduce((heatMap: HeatMap, board: LifeStatus) => {
    board.forEach((row, rowIndex) =>
      row.forEach(
        (cell, colIndex) => (heatMap[rowIndex][colIndex] += cell ? 1 : 0)
      )
    );
    return heatMap;
  }, createBoard<number>(history[0].length, history[0][0].length, 0));
