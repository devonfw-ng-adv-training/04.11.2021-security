import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {SecurityService} from './security.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthorizedRoute} from '../model';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly accessDeniedPageUrlTree;

  constructor(private readonly security: SecurityService, router: Router) {
    this.accessDeniedPageUrlTree = router.parseUrl('/access-denied');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | Observable<boolean | UrlTree> {
    const currentRoute = route.routeConfig as AuthorizedRoute | null;
    const requiredRight = currentRoute?.requiresRight;
    if (requiredRight) {
      return this.security.userHasRight(requiredRight)
        .pipe(map(isAuthorized => isAuthorized || this.accessDeniedPageUrlTree));
    }
    return this.accessDeniedPageUrlTree;
  }
}
