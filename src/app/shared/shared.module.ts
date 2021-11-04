import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { BasicValidationOutputComponent } from './basic-validation-output/basic-validation-output.component';
import {TranslateModule} from "@ngx-translate/core";

const exportedModules = [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule];
const exportedComponents = [BasicValidationOutputComponent];

@NgModule({
  declarations: [
    ...exportedComponents
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  exports: [
    ...exportedModules,
    ...exportedComponents
  ]
})
export class SharedModule {
}
