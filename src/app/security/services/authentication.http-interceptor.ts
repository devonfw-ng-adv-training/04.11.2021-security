import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SecurityService} from './security.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {fromPromise} from 'rxjs/internal-compatibility';
import {SecurityContext} from '../model';

@Injectable()
export class AuthenticationHttpInterceptor implements HttpInterceptor {
  constructor(private readonly security: SecurityService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return fromPromise(this.security.getContext())
      .pipe(
        getJwtAccessTokenFromSecurityContext(),
        addJwtAccessTokenToRequestsAndReloadCurrentPageOnUnauthorizedResponses(req, next),
      );
  }
}

function getJwtAccessTokenFromSecurityContext() {
  return map<SecurityContext | null, string | undefined>((securityContext) => securityContext?.jwtAccessToken);
}

function addJwtAccessTokenToRequestsAndReloadCurrentPageOnUnauthorizedResponses(
  req: HttpRequest<any>,
  next: HttpHandler,
) {
  return switchMap<string | undefined, Observable<HttpEvent<any>>>((jwtAccessToken) => {
    const request = jwtAccessToken ? req.clone({setHeaders: {Authorization: `Bearer ${jwtAccessToken}`}}) : req;
    return next.handle(request).pipe(reloadCurrentPageOnUnauthorizedResponse());
  });

  function reloadCurrentPageOnUnauthorizedResponse() {
    return catchError<HttpEvent<any>, Observable<never>>((error) => {
      if (error instanceof HttpErrorResponse) {
        const httpErrorResponse = error as HttpErrorResponse;
        if (httpErrorResponse.status === 401) {
          console.log('Token expired. Reloading page');
          location.reload();
        }
      }
      return throwError(error);
    });
  }
}
