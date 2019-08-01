import { action$ } from "./baseStream$";
import { filter } from "rxjs/operators";
import { Action } from "./actions/utils";
import { PREVIEW_SHAPE, PreviewShapePayload } from "./topBar/actions";

export const previewShape$ = action$.pipe(
  filter((action: Action<PreviewShapePayload>) => action.type === PREVIEW_SHAPE)
);
