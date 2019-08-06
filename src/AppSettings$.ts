import { action$ } from "./baseStream$";
import { filterReduceAndStartWithDefault } from "./streamUtils";
import { shapes } from "./shapes";

import { shareReplay, tap } from "rxjs/operators";

import { defaultTick } from "./topBar/speedOptions";
import { reducers } from "./AppSettingsReducers";

export const defaultTileSize = 5;
const acorn = shapes["Methuselah:"][0];
export const appSettings$ = action$.pipe(
  filterReduceAndStartWithDefault(reducers, {
    columns: 320,
    rows: 130,
    selectedShape: acorn,
    newGame: false,
    tileSize: defaultTileSize,
    isPlaying: false,
    tickTime: defaultTick
  }),
  tap(state => console.log("state", state)),
  shareReplay(1)
);
