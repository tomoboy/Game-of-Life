import { Subject } from "rxjs";
import { Action } from "../actions/utils";

export const action$ = new Subject<Action<any>>();
export const dispatchAction = (action: Action<any>) => action$.next(action);
