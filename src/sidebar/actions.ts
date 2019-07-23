import { createAction } from "../actions/utils";
import { Shape } from "../types";

export interface BoardSizePayload {
  rows: number;
  columns: number;
}

export const BOARD_SIZE = Symbol("BOARD_SIZE");
export const boardSize = createAction<BoardSizePayload>(BOARD_SIZE);

export interface NewBoardPayload {
  columns: number;
  rows: number;
}

export const NEW_BOARD = Symbol("NEW_BOARD");
export const newBoard = createAction<NewBoardPayload>(NEW_BOARD);

export interface PreviewShapePayload {
  shape: Shape | null;
}

export const PREVIEW_SHAPE = Symbol("PREVIEW_SHAPE");
export const previewShape = createAction<PreviewShapePayload>(PREVIEW_SHAPE);

export interface SelectedShapePayload {
  shape: Shape | null;
}
export const SELECTED_SHAPE = Symbol("SELECTED_SHAPE");
export const selectedShape = createAction<SelectedShapePayload>(SELECTED_SHAPE);
