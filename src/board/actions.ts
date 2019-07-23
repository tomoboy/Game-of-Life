import { createAction } from "../actions/utils";

export interface TileHoverPayload {
  curX: number;
  curY: number;
}

export const TILE_HOVER = Symbol("tileHover");
export const tileHover = createAction<TileHoverPayload>(TILE_HOVER);

export const REMOVE_PREVIEW = Symbol("removePreview");
export const removePreview = createAction(REMOVE_PREVIEW);
