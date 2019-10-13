import { action$ } from "./baseStream$";
import { filterReduceAndStartWithDefault } from "./streamUtils";
import { shapes } from "../patterns/shapes";

import { shareReplay, tap } from "rxjs/operators";

import { defaultTick } from "../topBar/speedOptions";
import { reducers } from "./AppSettingsReducers";

export const defaultTileSize = 9;

const acorn = shapes["Methuselah:"][0];
export const appSettings$ = action$.pipe(
  filterReduceAndStartWithDefault(reducers, {
    columns: 100,
    rows: 88,
    selectedShape: acorn,
    newGame: false,
    tileSize: defaultTileSize,
    isPlaying: false,
    tickTime: defaultTick,
    isSoundOn: true
  }),
  tap(state => console.log("state", state)),
  shareReplay(1)
);
