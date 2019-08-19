import { Shape } from "../types";
import { BoardState, ChangedState } from "./types";

export const createEmptyBoardState = (rows: number, columns: number) =>
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
const changesDifferentFromBoard = (
  changes: ChangedState[],
  boardState: BoardState
) =>
  changes
    .filter(({ y, x, alive }) => alive !== boardState[y][x])
    .map(({ y, x }) => ({
      y,
      x,
      alive: boardState[y][x]
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
        typeof newHoverState[existingChangeIndex] !== "undefined" &&
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
