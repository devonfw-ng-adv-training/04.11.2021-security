import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SecurityService} from './security.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly security: SecurityService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const backUrl = state.url;
    return this.security.getContext().then(context => {
      const isAuthenticated = !!context;
      if (!isAuthenticated) {
        setTimeout(() => this.security.goToSignInDialog(backUrl));
      }
      return isAuthenticated;
    });
  }
}
