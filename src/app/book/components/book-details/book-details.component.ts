import {Component, OnDestroy} from '@angular/core';
import {Book, BookProps} from '../../model/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnDestroy {
  bookForm: FormGroup;
  private readonly book: Book | undefined;
  private unsubscribe = new Subject();

  constructor(private books: BookService,
              private router: Router,
              private currentRoute: ActivatedRoute) {
    this.book = currentRoute.snapshot.data.book;
    this.bookForm = new FormGroup({
      author: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      title: new FormControl(null, Validators.required)
    });
    if (this.book) {
      this.bookForm.patchValue(this.book);
    }
  }

  saveAndGoToOverview() {
    if (this.bookForm.valid) {
      const author = this.bookForm.get('author')?.value;
      const title = this.bookForm.get('title')?.value;

      let saveOrUpdate: Observable<Book>;
      if (this.book) { // edit existing book
        const bookToUpdate: Book = {...this.book, author, title};
        saveOrUpdate = this.books.update(bookToUpdate);
      } else { // new book
        const bookToSave: BookProps = {author, title};
        saveOrUpdate = this.books.save(bookToSave)
      }

      saveOrUpdate.pipe(takeUntil(this.unsubscribe)).subscribe(
        () => this.router.navigate(['..'], {relativeTo: this.currentRoute}))
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
