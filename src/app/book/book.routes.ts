import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {Route} from '@angular/router';
import {BookResolver} from './components/book-details/book.resolver';
import {AuthenticationGuard} from '../security/services/authentication.guard';

export const bookRoutes: Route = {
  path: 'books',
  children: [
    {
      path: '',
      component: BookOverviewComponent
    },
    {
      path: 'new',
      component: BookDetailsComponent,
      canActivate: [AuthenticationGuard]
    },
    {
      path: ':bookId',
      component: BookDetailsComponent,
      canActivate: [AuthenticationGuard],
      resolve: {
        book: BookResolver
      }
    }
  ],
}
