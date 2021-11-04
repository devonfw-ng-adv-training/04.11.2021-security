import {Route} from '@angular/router';

export interface SecurityContext {
  jwtAccessToken: string;
  email: string;
}

export type UserRight = 'newBook' | 'updateBook';

export interface AuthorizedRoute extends Route {
  requiresRight?: UserRight;
  children?: AuthorizedRoute[];
}
