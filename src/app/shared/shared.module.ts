import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

const exportedModules = [CommonModule, RouterModule, ReactiveFormsModule];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...exportedModules
  ]
})
export class SharedModule {
}
