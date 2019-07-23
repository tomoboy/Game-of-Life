import { AppState } from "./types";
import { NewGamePayload, SET_NEW_GAME } from "./actions/appActions";
import {
  CHANGE_SELECTED_SHAPE,
  NEW_TICK_TIME,
  NewTickTimePayload,
  SelectedShapePayload,
  TOGGLE_FULL_SCREEN,
  TOGGLE_PLAY,
  ToggleFullScreenPayload,
  TogglePlayPayload,
  ZOOM,
  ZoomPayload
} from "./topBar/actions";
export const reducers = new Map<symbol, any>([
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
  ],
  [
    NEW_TICK_TIME,
    (state: AppState, { tickTime }: NewTickTimePayload) => ({
      ...state,
      tickTime
    })
  ],
  [
    CHANGE_SELECTED_SHAPE,
    (state: AppState, { shape }: SelectedShapePayload) => ({
      ...state,
      selectedShape: shape
    })
  ],
  [
    ZOOM,
    (state: AppState, { zoom }: ZoomPayload) => ({
      ...state,
      tileSize: state.tileSize + zoom
    })
  ],
  [
    TOGGLE_FULL_SCREEN,
    (state: AppState, { isFullScreen }: ToggleFullScreenPayload) => ({
      ...state,
      isFullScreen
    })
  ]
]);
