import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AMPLIFY_CONFIG, SecurityService} from './services/security.service';
import {AuthenticationGuard} from './services/authentication.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationHttpInterceptor} from './services/authentication.http-interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SecurityModule {
  static forRoot(amplifyConfig: any): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [
        SecurityService,
        {provide: AMPLIFY_CONFIG, useValue: amplifyConfig},
        AuthenticationGuard,
        {provide: HTTP_INTERCEPTORS, useClass: AuthenticationHttpInterceptor, multi: true}
      ]
    }
  }
}
