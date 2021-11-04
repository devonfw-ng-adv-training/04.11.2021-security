import { Action } from '../custom-store/action.model';
import { Book } from '../model/book';

export interface State {
  data: Book[];
}

export const initialState: State = {
  data: [
    {
      id: 0,
      author: 'Douglas Crockford- from custom ngrx',
      title: 'JavaScript. The Good Parts',
    },
    {
      id: 1,
      author: 'Michal Jawulski & Marek Matczak- from custom ngrx',
      title: 'Angular for nerds',
    },
    {
      id: 2,
      author: 'Tom Hombergs- from custom ngrx',
      title: 'Get You Hands Dirty on Hexagonal Architecture',
    },
    {
      author: 'John Smith- from custom ngrx',
      title: 'Funny book on Angular',
      id: 3,
    },
  ],
};

export function booksReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case '[Books] Update book': {
      const { payload } = action;
      return {
        ...state,
        data: state.data.map((oldBook) => {
          if (oldBook.id === payload.id) {
            return { ...payload };
          } else {
            return oldBook;
          }
        }),
      };
    }
  }
  return state;
}
