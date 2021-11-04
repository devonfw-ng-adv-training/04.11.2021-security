import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { BasicValidationOutputComponent } from './basic-validation-output/basic-validation-output.component';

const exportedModules = [CommonModule, RouterModule, ReactiveFormsModule];
const exportedComponents = [BasicValidationOutputComponent];

@NgModule({
  declarations: [
    ...exportedComponents
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
