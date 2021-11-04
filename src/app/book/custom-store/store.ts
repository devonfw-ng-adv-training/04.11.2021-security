import { Action } from "./action.model";

export class Store {
  reducers: { [key: string]: Function };
  state: { [key: string]: any };
  subscribers: Function[];

  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
    this.subscribers = [];
  }

  get value() {
    return this.state;
  }

  subscribe(fn: Function) {
    this.subscribers = [...this.subscribers, fn];
    fn(this.state);

    return () => {
      this.subscribers = this.subscribers.filter(
        (subscriber) => subscriber !== fn
      );
    };
  }

  dispatch(action: Action) {
    console.log(action);
    this.state = this.reduce(this.state, action);
    this.subscribers.forEach((subscriber) => subscriber(this.state));
    console.log(this.value);
  }

  reduce(state: any, action: Action) {
    const newState: { [key: string]: any } = {};
    for (const prop in this.reducers) {
      if (Object.prototype.hasOwnProperty.call(this.reducers, prop)) {
        const reducer = this.reducers[prop];
        newState[prop] = reducer(state[prop], action);
      }
    }
    return newState;
  }
}
