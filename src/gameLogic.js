export default function tick(currentBoard, newBoard) {
  const wrapRow1 = i => (i > 0 ? i - 1 : currentBoard.length - 1);
  const wrapRow2 = i => (i === currentBoard.length - 1 ? 0 : i + 1);
  const wrapCol1 = j => (j > 0 ? j - 1 : currentBoard[0].length - 1);
  const wrapCol2 = j => (j === currentBoard[0].length - 1 ? 0 : j + 1);
  const board = (i, j) => currentBoard[i][j];
  const over = (i, j) => board(wrapRow1(i), j);
  const leftOver = (i, j) => board(wrapRow1(i), wrapCol1(j));
  const rightOver = (i, j) => board(wrapRow1(i), wrapCol2(j));
  const under = (i, j) => board(wrapRow2(i), j);
  const leftUnder = (i, j) => board(wrapRow2(i), wrapCol1(j));
  const rightUnder = (i, j) => board(wrapRow2(i), wrapCol2(j));
  const left = (i, j) => board(i, wrapCol1(j));
  const right = (i, j) => board(i, wrapCol2(j));
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
  const changes = [];

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
      newBoard[rowIndex][colIndex] = alive;
    })
  );
  return { newBoard, changes };
}
