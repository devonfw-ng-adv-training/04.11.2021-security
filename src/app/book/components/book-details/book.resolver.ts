import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Book} from '../../model/book';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {BookService} from '../../services/book.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class BookResolver implements Resolve<Book> {
  constructor(private books: BookService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookIdAsString = route.paramMap.get('bookId');
    if (bookIdAsString) {
      const bookId: number = parseInt(bookIdAsString, 10);
      if (!isNaN(bookId)) {
        return this.books.getOne(bookId)
          .pipe(
            catchError(err => {
              this.deferNavigatingToNewBook();
              return throwError(err);
            })
          );
      }
    }
    this.deferNavigatingToNewBook();
    throw new Error('Book ID could not be parsed from URL');
  }

  private deferNavigatingToNewBook(): void {
    setTimeout(() => this.router.navigateByUrl('/books/new'));
  }
}
