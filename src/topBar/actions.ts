import { createAction } from "../actions/utils";

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

