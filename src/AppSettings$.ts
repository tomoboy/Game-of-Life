import { action$ } from "./baseStream$";
import { CHANGE_BOARD_SIZE, IBoardSize } from "./sidebar/actions";
import { filterReduceAndStartWithDefault } from "./streamUtils";
import { IAppState } from "./types";

const reducers = new Map([
  [
    CHANGE_BOARD_SIZE,
    (state: IAppState, { columns, rows }: IBoardSize) => ({
      ...state,
      columns,
      rows
    })
  ]
]);

export const appSettings$ = action$.pipe(
  filterReduceAndStartWithDefault(reducers, {
    columns: 300,
    rows: 200
  })
);
