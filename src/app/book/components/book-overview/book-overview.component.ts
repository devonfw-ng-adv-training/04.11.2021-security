import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from '../../../security/services/security.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnDestroy {
  books$: Observable<Book[]>;
  userHasRightToUpdateBook$: Observable<boolean>;
  private readonly unsubscribe = new Subject();

  constructor(private books: BookService,
              private router: Router,
              private currentRoute: ActivatedRoute,
              private readonly security: SecurityService) {
    this.books$ = books.findAll();
    this.userHasRightToUpdateBook$ = this.security.userHasRight('updateBook');
  }

  goToDetailsOf(book: Book): void {
    this.userHasRightToUpdateBook$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(isAuthorized => {
        if (isAuthorized) {
          this.router.navigate([book.id], {relativeTo: this.currentRoute});
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
