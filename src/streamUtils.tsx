import { Observable, pipe } from "rxjs";
import { filter, scan, startWith } from "rxjs/operators";
import React, { useEffect, useState, Component } from "react";
import { AppState } from "./types";

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
) =>
  class extends Component<any> {
    state: any = null;
    subscription: any = null;

    componentDidMount() {
      this.subscription = stream.subscribe((state: any) => {
        console.log("newState3", state);
        this.setState(state);
      });
    }
    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      const props = { ...this.state, ...this.props };
      return this.state === null
        ? null
        : React.createElement(WrappedComponent, props);
    }
  };
