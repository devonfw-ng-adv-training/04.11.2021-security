import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {BookService} from './book/services/book.service';
import {Observable, of} from 'rxjs';
import {Book} from './book/model/book';
import {AppHeaderComponent} from './core/components/app-header/app-header.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, AppHeaderComponent
      ],
      imports: [
        RouterTestingModule, BookModule.forRoot()
      ],
      providers: [{
        provide: BookService, useValue: {
          findAll(): Observable<Book[]> {
            return of([{id: 1, title: 'Funny book', author: 'Little John'}]);
          }
        }
      }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
