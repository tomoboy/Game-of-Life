import { createAction } from "./utils";

export interface IErrorMessagePayload {
  errorMessage: string;
}

export const REPORT_ERROR = Symbol("REPORT_ERROR");
export const reportError = createAction<IErrorMessagePayload>(REPORT_ERROR);

export interface INewBoardPayload {
  columns: number;
  rows: number;
}

export const NEW_BOARD = Symbol("NEW_BOARD");
export const newBoard = createAction<INewBoardPayload>(NEW_BOARD);
