import { Observable, pipe } from "rxjs";
import { filter, scan, startWith } from "rxjs/operators";
import React, { useEffect, useState } from "react";

export const filterReduceAndStartWithDefault = (
  reducers: any,
  defaultState: any
) =>
  pipe(
    filter((action: any) => reducers.has(action.type)),
    scan(
      (state, { type, ...payload }) => reducers.get(type)(state, payload),
      defaultState
    ),
    startWith(defaultState)
  );

export const connect = (
  WrappedComponent: React.FunctionComponent<any>,
  stream: Observable<any>
) => (props: any) => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const subscription = stream.subscribe((state: any) => {
      setState(state);
    });
    return () => {
      subscription.unsubscribe();
    };
  });
  const props2 = { ...state, ...props };
  return state === null ? null : <WrappedComponent {...props2} />;
};
