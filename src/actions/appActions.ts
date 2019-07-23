import { createAction } from "./utils";

export interface ErrorMessagePayload {
  errorMessage: string;
}

export const REPORT_ERROR = Symbol("REPORT_ERROR");
export const reportError = createAction<ErrorMessagePayload>(REPORT_ERROR);

export interface NewGamePayload {
  newGame: boolean;
}
export const SET_NEW_GAME = Symbol("SET_NEW_GAME");
export const setNewGame = createAction<NewGamePayload>(SET_NEW_GAME);
