import { Subject } from 'rxjs'
import { Action } from './actions/utils'

const createActionStream = () => new Subject<Action<any>>();
export const action$ = createActionStream();
export const dispatchAction = (action: Action<any>) => action$.next(action);