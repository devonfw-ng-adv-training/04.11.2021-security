import {Component} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books$: Observable<Book[]>;

  constructor(private books: BookService,
              private router: Router,
              private currentRoute: ActivatedRoute) {
    this.books$ = books.findAll();
  }

  goToDetailsOf(book: Book): void {
    this.router.navigate([book.id], {relativeTo: this.currentRoute});
  }
}
