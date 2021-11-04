import {Auth, CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {Hub} from '@aws-amplify/core';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityContext} from '../model';

export const AMPLIFY_CONFIG = new InjectionToken('AMPLIFY_CONFIG');

@Injectable()
export class SecurityService {
  constructor(@Inject(AMPLIFY_CONFIG) amplifyConfig: any,
              private readonly router: Router) {
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
}
