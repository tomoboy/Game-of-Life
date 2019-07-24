import { createAction } from "../actions/utils";
import { Shape } from "../types";

export interface ToggleFullScreenPayload {
  isFullScreen: boolean;
}
export const TOGGLE_FULL_SCREEN = Symbol("toggleFullScreen");
export const toggleFullScreen = createAction<ToggleFullScreenPayload>(
  TOGGLE_FULL_SCREEN
);

export interface NewTickTimePayload {
  tickTime: number;
}
export const NEW_TICK_TIME = Symbol("newTickTime");
export const newTickTime = createAction<NewTickTimePayload>(NEW_TICK_TIME);

export interface TogglePlayPayload {
  isPlaying: boolean;
}
export const TOGGLE_PLAY = Symbol("togglePlay");
export const togglePlay = createAction<TogglePlayPayload>(TOGGLE_PLAY);

export interface ZoomPayload {
  zoom: number;
}

export const ZOOM = Symbol("zoom");
export const zoom = createAction<ZoomPayload>(ZOOM);

export interface NewBoardPayload {
  columns: number;
  rows: number;
}

export const NEW_BOARD = Symbol("NEW_BOARD");
export const newBoard = createAction<NewBoardPayload>(NEW_BOARD);

export interface SelectedShapePayload {
  shape: Shape | null;
}

export const CHANGE_SELECTED_SHAPE = Symbol("SELECTED_SHAPE");
export const changeSelectedShape = createAction<SelectedShapePayload>(
  CHANGE_SELECTED_SHAPE
);
export interface PreviewShapePayload {
  previewShape: Shape | null;
}

export const PREVIEW_SHAPE = Symbol("PREVIEW_SHAPE");
export const previewShape = createAction<PreviewShapePayload>(PREVIEW_SHAPE);
