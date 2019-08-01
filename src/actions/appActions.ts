import { createAction } from "./utils";

export interface NewGamePayload {
  newGame: boolean;
}
export const SET_NEW_GAME = Symbol("SET_NEW_GAME");
export const setNewGame = createAction<NewGamePayload>(SET_NEW_GAME);
