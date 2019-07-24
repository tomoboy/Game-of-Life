import { action$ } from "./baseStream$";
import { filterReduceAndStartWithDefault } from "./streamUtils";
import { Shapes } from "./types";
import { shapes } from "./shapes";

import { shareReplay, tap } from "rxjs/operators";

import { defaultTick } from "./topBar/speedOptions";
import { reducers } from "./AppSettingsReducers";

const singleCell = (shapes as Shapes)[""][0];
export const appSettings$ = action$.pipe(
  filterReduceAndStartWithDefault(reducers, {
    columns: 300,
    rows: 300,
    selectedShape: singleCell,
    newGame: false,
    tileSize: 3,
    isPlaying: false,
    tickTime: defaultTick,
    isFullScreen: false
  }),
  tap(state => console.log("state", state)),
  shareReplay(1)
);
