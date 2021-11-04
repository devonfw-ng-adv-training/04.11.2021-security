import { Component } from '@angular/core';
import { Book } from '../../model/book';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ReduxBookService } from '../../services/redux-book.service';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  books$: Observable<Book[]>;

  constructor(
    private books: BookService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private store: Store<{ books: { data: Book[] } }>,
    private customStore: ReduxBookService
  ) {
    this.books$ = customStore.select((state) => state.books.data);
  }

  goToDetailsOf(book: Book): void {
    this.router.navigate([book.id], { relativeTo: this.currentRoute });
  }
}
