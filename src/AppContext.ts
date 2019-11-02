import { shapes } from './patterns/shapes';
import React from 'react';
import { AppState } from './types';
import { Action } from './AppSettingsReducers';
import { defaultTick } from './topBar/speedOptions';

export const defaultTileSize = 9;
const acorn = shapes['Methuselah:'][0];
export const initialState: AppState = {
  columns: 100,
  rows: 88,
  selectedShape: acorn,
  newGame: false,
  tileSize: defaultTileSize,
  isPlaying: false,
  tickTime: defaultTick,
  isSoundOn: true,
  previewShape: null
};
export const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {}
});
