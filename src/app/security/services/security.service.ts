import {Auth, CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {Hub} from '@aws-amplify/core';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityContext, UserRight} from '../model';
import {Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {HttpClient, HttpParams} from '@angular/common/http';

export const AMPLIFY_CONFIG = new InjectionToken('AMPLIFY_CONFIG');

interface User {
  email: string;
  rights: UserRight[];
}

@Injectable()
export class SecurityService {
  private currentUserRights$: Observable<UserRight[]> | undefined;

  constructor(@Inject(AMPLIFY_CONFIG) amplifyConfig: any,
              private readonly router: Router,
              private readonly http: HttpClient) {
    Auth.configure(amplifyConfig);
    Hub.listen('auth', ({payload: {event, data}}) => {
      if (event === 'customOAuthState') {
        this.router.navigateByUrl(data);
      }
    });
  }

  getContext(): Promise<SecurityContext | null> {
    return Auth.currentSession().then(
      (currentSession) => ({
        jwtAccessToken: currentSession.getIdToken().getJwtToken(),
        email: currentSession.getIdToken().payload.email,
      }),
      () => null,
    );
  }

  goToSignInDialog(backUrl?: string): Promise<void> {
    return Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Cognito,
      customState: backUrl || '/',
    }).then(() => undefined);
  }

  signOut(): Promise<void> {
    return Auth.signOut();
  }

  userHasRight(right: UserRight): Observable<boolean> {
    return this.getCurrentUserRightsPossiblyCached()
      .pipe(map(currentUserRights => currentUserRights.includes(right)))
  }

  private getCurrentUserRightsPossiblyCached(): Observable<UserRight[]> {
    if (!this.currentUserRights$) {
      this.currentUserRights$ = fromPromise(this.getContext())
        .pipe(
          map(context => context?.email),
          switchMap(email => email ? this.getUserRightsBy(email) : of([])),
          shareReplay(1)
        )
    }
    return this.currentUserRights$;
  }

  private getUserRightsBy(userEmail: string): Observable<UserRight[]> {
    const params = new HttpParams().set('email', userEmail);
    return this.http.get<User[]>('api/users', {params})
      .pipe(
        map(users => users?.[0].rights ?? [])
      )
  }
}
