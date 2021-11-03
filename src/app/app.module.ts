import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookModule } from './book/book.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { bookRoutes } from './book/book.routes';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { booksReducer } from './book/store/reducers/books.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/books', pathMatch: 'full' },
      bookRoutes,
    ]),
    BookModule.forRoot(),
    StoreModule.forRoot({ books: booksReducer }),
    StoreDevtoolsModule.instrument(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
