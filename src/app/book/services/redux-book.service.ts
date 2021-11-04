import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from '../custom-store/action.model';
import { Action as NgRxAction } from '@ngrx/store';
import { Store } from '../custom-store/store';
import { booksReducer } from './books.reducer';

@Injectable()
export class ReduxBookService {
  private storeDataBehaviourSubject;
  private store: Store;
  constructor() {
    this.store = new Store({ books: booksReducer });
    this.storeDataBehaviourSubject = new BehaviorSubject(this.store.value);
    this.store.subscribe((state) => {
      this.storeDataBehaviourSubject.next(state);
    });
  }

  select<T>(selectorFn): Observable<T> {
    return from(this.storeDataBehaviourSubject).pipe(
      map((state) => {
        const data = selectorFn(state);
        return data;
      })
    );
  }

  dispatch(ngrxAction: NgRxAction) {
    console.log('NgRxAction::', ngrxAction);
    const action: Action = ngrxAction;
    console.log('action::', action);

    return this.store.dispatch(ngrxAction);
  }
}
