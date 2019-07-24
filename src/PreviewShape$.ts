import { action$ } from "./baseStream$";
import { filter, shareReplay, startWith, tap } from "rxjs/operators";
import { Action } from "./actions/utils";
import { PREVIEW_SHAPE, PreviewShapePayload } from "./topBar/actions";

export const previewShape$ = action$.pipe(
  tap((action: any) => console.log("preview", action)),
  filter((action: Action<PreviewShapePayload>) => action.type === PREVIEW_SHAPE)
);
