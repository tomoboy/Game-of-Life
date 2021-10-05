import { shapes } from './patterns/shapes';
import React from 'react';
import { AppState } from './types';
import { Action } from './AppSettingsReducers';
import { defaultTick } from './topBar/speedOptions';

export const defaultTileSize = 20;
const glider = shapes['Space ships:'][1];
export const initialState: AppState = {
  columns: 75,
  rows: 50,
  selectedShape: glider,
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
