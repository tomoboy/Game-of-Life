import {Observable, pipe} from "rxjs";
import {filter, scan, startWith} from "rxjs/operators";
import React, { Component} from "react";

export const filterReduceAndStartWithDefault = (reducers, defaultState) =>
  pipe(
    filter(action => reducers.has(action.type)),
    scan(
      (state, { type, ...payload }) => reducers.get(type)(state, payload),
      defaultState
    ),
    startWith(defaultState)
  );

export const connect = (WrappedComponent, streamsDictOrStream) =>
  class extends Component {
      constructor(props) {
          super(props);
          this.state = null;
          this.subscriptions = new Map();
          this.subscription = null;
      }

      componentDidMount() {
          if (streamsDictOrStream instanceof Observable) {
              this.subscription = streamsDictOrStream.subscribe(state =>
                  this.setState(state)
              );
          } else {
              Object.entries(streamsDictOrStream).forEach(([name, stream]) =>
                  this.subscriptions.set(
                      name,
                      stream.subscribe(state => this.setState({[name]: state}))
                  )
              );
          }
      }

      componentWillUnmount() {
          if (streamsDictOrStream instanceof Observable) {
              this.subscription.unsubscribe();
              this.subscription = null;
          } else {
              [...this.subscriptions.values()].forEach(subscription =>
                  subscription.unsubscribe()
              );
              this.subscriptions.clear();
          }
      }

      render() {
          const props2 = {...this.state, ...this.props};
          return this.state === null ? null : <WrappedComponent {...props2} />;
      }
  };
