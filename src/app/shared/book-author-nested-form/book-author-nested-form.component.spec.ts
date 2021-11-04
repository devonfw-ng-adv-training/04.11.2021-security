import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAuthorNestedFormComponent } from './book-author-nested-form.component';

describe('BookAuthorNestedFormComponent', () => {
  let component: BookAuthorNestedFormComponent;
  let fixture: ComponentFixture<BookAuthorNestedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookAuthorNestedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAuthorNestedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
