import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {RouterModule} from '@angular/router';
import {CoreModule} from './core/core.module';
import {bookRoutes} from './book/book.routes';
import {HttpClientModule} from '@angular/common/http';
import {SecurityModule} from './security/security.module';
import {AccessDeniedComponent} from './security/components/access-denied/access-denied.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SecurityModule.forRoot({
      userPoolId: 'eu-central-1_5QiuwGB1A',
      userPoolWebClientId: '3e4f373o3vbglt3dmuobd20ov7',
      oauth: {
        region: 'eu-central-1',
        domain: 'book-app-users.auth.eu-central-1.amazoncognito.com',
        scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: 'http://localhost:4200/',
        redirectSignOut: 'http://localhost:4200/',
        responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
      }
    }),
    CoreModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/books', pathMatch: 'full'},
      {path: 'access-denied', component: AccessDeniedComponent},
      bookRoutes
    ]),
    BookModule.forRoot()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
