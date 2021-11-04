export interface Book {
  id: number;
  author: BookAuthor;
  title: string
  categories: string[];
  details: BookDetails;
}
export interface BookAuthor {
  firstname: string;
  lastname: string;
}
export interface BookDetails {
  publishedYear: number;
  isbn: string;
}
export type BookProps = Omit<Book, 'id'>;
