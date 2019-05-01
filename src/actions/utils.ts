export type ActionType = symbol;

export type Action<TPayload> = {
  type: ActionType;
} & TPayload;

export function createAction(type: ActionType): () => { type: ActionType };
export function createAction<P>(type: ActionType): (payload: P) => Action<P>;
export function createAction<P>(type: ActionType): (payload: P) => Action<P> {
  return payload => ({ type, ...payload });
}
