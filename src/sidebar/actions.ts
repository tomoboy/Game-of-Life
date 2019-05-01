import { createAction } from "../actions/utils";

export interface IBoardSize {
  rows: number;
  columns: number;
}

export const CHANGE_BOARD_SIZE = Symbol("CHANGE_BOARD_SIZE");
export const changeBoardSize = createAction<IBoardSize>(CHANGE_BOARD_SIZE);
