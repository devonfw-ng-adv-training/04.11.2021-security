import { createAction, props } from '@ngrx/store';
import { Book } from '../../model/book';

export const addBook = createAction('[Books] Add', props<{ book: Book }>());
export const updateBook = createAction(
  '[Books] Update book',
  props<{ newBook: Book }>()
);
