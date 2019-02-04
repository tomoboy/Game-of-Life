export default function tick(currentBoard, newBoard) {
  const wrapRow1 = i => (i > 0 ? i - 1 : currentBoard.length - 1),
    wrapRow2 = i => (i === currentBoard.length - 1 ? 0 : i + 1),
    wrapCol1 = j => (j > 0 ? j - 1 : currentBoard[0].length - 1),
    wrapCol2 = j => (j === currentBoard[0].length - 1 ? 0 : j + 1),
    board = (i, j) => currentBoard[i][j],
    over = (i, j) => board(wrapRow1(i), j),
    leftOver = (i, j) => board(wrapRow1(i), wrapCol1(j)),
    rightOver = (i, j) => board(wrapRow1(i), wrapCol2(j)),
    under = (i, j) => board(wrapRow2(i), j),
    leftUnder = (i, j) => board(wrapRow2(i), wrapCol1(j)),
    rightUnder = (i, j) => board(wrapRow2(i), wrapCol2(j)),
    left = (i, j) => board(i, wrapCol1(j)),
    right = (i, j) => board(i, wrapCol2(j)),
    neighbourFunctions = [over, leftOver, rightOver, under, leftUnder, rightUnder, left, right],
    changes = [];

  currentBoard.forEach((row, rowIndex) =>
    row.forEach((tile, colIndex) => {
      let alive = tile;
      let livingNeighbours = neighbourFunctions.reduce(
        (total, neighbourFunc) => (neighbourFunc(rowIndex, colIndex) ? total + 1 : total),
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
      if (tile !== alive) changes.push({ rowIndex, colIndex, alive });
      newBoard[rowIndex][colIndex] = alive;
    })
  );
  return { newBoard, changes };
}
