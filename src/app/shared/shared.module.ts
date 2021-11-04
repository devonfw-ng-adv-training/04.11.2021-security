import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { BasicValidationOutputComponent } from './basic-validation-output/basic-validation-output.component';
import {TranslateModule} from "@ngx-translate/core";
import { BookAuthorNestedFormComponent } from './book-author-nested-form/book-author-nested-form.component';

import { NumberInputComponent } from './number-input/number-input.component';
import {DetailsNestedFormComponent} from "./details-nested-form/details-nested-form.component";
import {IsInvalidClassDirective} from "./is-invalid-class.directive";

const exportedModules = [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule];
const exportedComponents = [
  NumberInputComponent, IsInvalidClassDirective, DetailsNestedFormComponent,  BasicValidationOutputComponent, BookAuthorNestedFormComponent];

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
