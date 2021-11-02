export interface Book {
  id: number;
  author: string;
  title: string
}

export type BookProps = Omit<Book, 'id'>;
