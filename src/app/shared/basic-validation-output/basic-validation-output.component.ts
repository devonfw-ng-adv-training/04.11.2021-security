import {Component, ContentChild, HostBinding, Input, OnInit} from '@angular/core';
import {AbstractControl, NgControl} from "@angular/forms";

@Component({
  selector: 'ba-basic-validation-output',
  templateUrl: './basic-validation-output.component.html',
  styleUrls: ['./basic-validation-output.component.scss']
})
export class BasicValidationOutputComponent {

  @ContentChild(NgControl)
  validationControl!: AbstractControl | null;
}
