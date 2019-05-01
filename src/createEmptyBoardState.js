export default function(rows, columns) {
  let emptyBoard = [];
  for (let i = 0; i < rows; i++) {
    let newColum = [];
    for (let j = 0; j < columns; j++) {
      newColum.push(false);
    }
    emptyBoard.push(newColum);
  }
  return emptyBoard;
}
