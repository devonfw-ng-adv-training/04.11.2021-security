import {NgModule} from '@angular/core';
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {SharedModule} from '../shared/shared.module';
import {SecurityModule} from '../security/security.module';


@NgModule({
  declarations: [
    AppHeaderComponent
  ],
  imports: [
    SharedModule, SecurityModule
  ],
  exports: [AppHeaderComponent]
})
export class CoreModule {
}
