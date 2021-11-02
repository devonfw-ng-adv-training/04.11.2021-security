import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorMessagesComponent} from './forms/error-messages/error-messages.component';

const exportedModules = [CommonModule, RouterModule, ReactiveFormsModule];
const exportedComponents = [ErrorMessagesComponent];

@NgModule({
  declarations: [
    ErrorMessagesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...exportedModules,
    ...exportedComponents
  ]
})
export class SharedModule {
}
