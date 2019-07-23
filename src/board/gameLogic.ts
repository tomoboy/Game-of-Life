import { BoardState, ChangedState } from "./types";

export default (currentBoard: BoardState) => {
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

  currentBoard.forEach((row, rowIndex) =>
    row.forEach((tile, colIndex) => {
      let alive = tile;
      let livingNeighbours = neighbourFunctions.reduce(
        (total, neighbourFunc) =>
          neighbourFunc(rowIndex, colIndex) ? total + 1 : total,
        0
      );
      if (
        (alive && livingNeighbours < 2) ||
        (alive && livingNeighbours > 3) ||
        (!alive && livingNeighbours === 3)
      ) {
        //underpopulation or overpopulation or reproduction
        alive = !alive;
      }
      if (tile !== alive) {
        changes.push({ rowIndex, colIndex, alive });
      }
    })
  );
  return changes;
};
