import { createReducer, on } from '@ngrx/store';
import { Book } from '../../model/book';
import { addBook, updateBook } from '../actions/books.actions';

export interface State {
  data: Book[];
}

export const initialState: State = {
  data: [
    {
      id: 0,
      author: 'Douglas Crockford- from ngrx',
      title: 'JavaScript. The Good Parts',
    },
    {
      id: 1,
      author: 'Michal Jawulski & Marek Matczak- from ngrx',
      title: 'Angular for nerds',
    },
    {
      id: 2,
      author: 'Tom Hombergs- from ngrx',
      title: 'Get You Hands Dirty on Hexagonal Architecture',
    },
    {
      author: 'John Smith- from ngrx',
      title: 'Funny book on Angular',
      id: 3,
    },
  ],
};

export const booksReducer = createReducer(
  initialState,
  on(addBook, (state, payload) => ({
    ...state,
    data: [...state.data, payload.book],
  })),
  on(updateBook, (state, payload) => ({
    ...state,
    data: state.data.map((oldBook) => {
      if (oldBook.id === payload.payload.id) {
        return { ...payload.payload };
      } else {
        return oldBook;
      }
    }),
  }))
);
