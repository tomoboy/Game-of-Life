import { action$ } from "./baseStream$";
import { BOARD_SIZE, BoardSizePayload } from "./sidebar/actions";
import { filterReduceAndStartWithDefault } from "./streamUtils";
import { AppState, Shapes } from "./types";
import { shapes } from "./sidebar/shapes";
import { NewGamePayload, SET_NEW_GAME } from "./actions/appActions";
import {shareReplay, tap} from "rxjs/operators";
import { TOGGLE_PLAY, TogglePlayPayload } from "./topBar/actions";
import { defaultTick } from "./topBar/speedOptions";

const reducers = new Map<symbol, any>([
  [
    BOARD_SIZE,
    (state: AppState, { columns, rows }: BoardSizePayload) => ({
      ...state,
      columns,
      rows
    })
  ],
  [
    SET_NEW_GAME,
    (state: AppState, { newGame }: NewGamePayload) => ({
      ...state,
      newGame
    })
  ],
  [
    TOGGLE_PLAY,
    (state: AppState, { isPlaying }: TogglePlayPayload) => ({
      ...state,
      isPlaying
    })
  ]
]);

const singleCell = (shapes as Shapes)[""][0];
export const appSettings$ = action$.pipe(
  filterReduceAndStartWithDefault(reducers, {
    columns: 50,
    rows: 50,
    selectedShape: singleCell,
    newGame: false,
    tileSize: 10,
    isPlaying: false,
    tickTime: defaultTick,
    isFullScreen: false
  }),
  tap(state => console.log("state", state)),
  shareReplay(1)
);
