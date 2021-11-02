import {Book, BookProps} from '../model/book';
import {BehaviorSubject, Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class BookService {
  constructor(private http: HttpClient) {
  }

  update(bookToUpdate: Book): Observable<Book> {
    return this.http.put<Book>(`api/books/${bookToUpdate.id}`, bookToUpdate);
  }

  save(bookToSave: BookProps): Observable<Book> {
    return this.http.post<Book>('api/books', bookToSave);
  }

  findAll(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books');
  }

  getOne(bookId: number): Observable<Book> {
    return this.http.get<Book>(`api/books/${bookId}`);
  }
}
