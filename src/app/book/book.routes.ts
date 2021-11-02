import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {Route} from '@angular/router';
import {BookResolver} from './components/book-details/book.resolver';

export const bookRoutes: Route = {
  path: 'books',
  children: [
    {
      path: '',
      component: BookOverviewComponent
    },
    {
      path: 'new',
      component: BookDetailsComponent
    },
    {
      path: ':bookId',
      component: BookDetailsComponent,
      resolve: {
        book: BookResolver
      }
    }
  ],
}
