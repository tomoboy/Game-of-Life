export default (rows: number, columns: number) => {
  return new Array(rows).fill(false).map(() => new Array(columns).fill(false));
};
