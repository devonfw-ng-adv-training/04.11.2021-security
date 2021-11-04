import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AMPLIFY_CONFIG, SecurityService} from './services/security.service';

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
      providers: [SecurityService, {provide: AMPLIFY_CONFIG, useValue: amplifyConfig}]
    }
  }
}
