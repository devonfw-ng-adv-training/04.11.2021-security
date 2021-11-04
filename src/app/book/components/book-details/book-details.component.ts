import {Component, OnDestroy} from '@angular/core';
import {Book, BookProps} from '../../model/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
              private currentRoute: ActivatedRoute,
              private fb: FormBuilder) {

    this.book = currentRoute.snapshot.data.book;
    this.bookForm = this.fb.group({
      author:  this.fb.group({
        firstname: [null, [Validators.required, Validators.maxLength(30)]],
        lastname:  [null, [Validators.required, Validators.maxLength(30)]],
      }),
      title:  [null, Validators.required],
      categories:  [[]] ,
      details:  this.fb.group({
        publishedYear: [null, [Validators.required]],
        isbn: [null, [Validators.required, Validators.maxLength(13)]],
      }),
    });
    if (this.book) {
      this.bookForm.patchValue(this.book);
    }
  }

  saveAndGoToOverview() {
    if (this.bookForm.valid) {
      const bookFormValue = this.bookForm.value;
      let saveOrUpdate: Observable<Book>;
      if (this.book) { // edit existing book
        const bookToUpdate: Book = {...this.book, ...bookFormValue};
        saveOrUpdate = this.books.update(bookToUpdate);
      } else { // new book
        saveOrUpdate = this.books.save(bookFormValue)
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
