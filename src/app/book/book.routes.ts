import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookResolver} from './components/book-details/book.resolver';
import {AuthenticationGuard} from '../security/services/authentication.guard';
import {AuthorizedRoute} from '../security/model';
import {AuthorizationGuard} from '../security/services/authorization.guard';

export const bookRoutes: AuthorizedRoute = {
  path: 'books',
  children: [
    {
      path: '',
      component: BookOverviewComponent
    },
    {
      path: 'new',
      component: BookDetailsComponent,
      requiresRight: 'newBook',
      canActivate: [AuthenticationGuard, AuthorizationGuard]
    },
    {
      path: ':bookId',
      component: BookDetailsComponent,
      requiresRight: 'updateBook',
      canActivate: [AuthenticationGuard, AuthorizationGuard],
      resolve: {
        book: BookResolver
      }
    }
  ],
}
