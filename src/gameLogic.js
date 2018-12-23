export default function tick(currentBoard, emptyBoard){
    let wrapRow1 = i =>  (i > 0) ? i - 1 : currentBoard.length - 1;
    let wrapRow2 = i =>  (i === currentBoard.length - 1) ? 0 : i + 1;
    let wrapCol1 = j =>  (j > 0) ? j - 1 : currentBoard[0].length - 1 ;
    let wrapCol2 = j =>  (j === currentBoard[0].length - 1) ? 0 : j + 1;
    let board = (i, j) => currentBoard[i][j];

    let over =       (i, j) => board(wrapRow1(i), j);
    let leftOver =   (i, j) => board(wrapRow1(i), wrapCol1(j));
    let rightOver =  (i, j) => board(wrapRow1(i), wrapCol2(j));

    let under =      (i, j) => board(wrapRow2(i), j);
    let leftUnder =  (i, j) => board(wrapRow2(i), wrapCol1(j));
    let rightUnder = (i, j) => board(wrapRow2(i), wrapCol2(j));

    let left =       (i, j) => board(i, wrapCol1(j));
    let right =      (i, j) => board(i, wrapCol2(j));
    let neighbourFunctions = [over, leftOver, rightOver, under, leftUnder, rightUnder, left, right];

    currentBoard.forEach((row, rowIndex) => row.forEach((tile, colIndex) => {
        let alive = tile;
        let livingNeighbours = neighbourFunctions.reduce((total, neighbourFunc) =>
            (neighbourFunc(rowIndex, colIndex) ? total + 1 : total), 0);
        if ((alive && livingNeighbours < 2) || (alive && livingNeighbours > 3) || (!alive && livingNeighbours === 3)){
            //underpopulation or overpopulation or reproduction
            alive = !alive
        }
        emptyBoard[rowIndex][colIndex] = alive
    }));
    return emptyBoard;
}