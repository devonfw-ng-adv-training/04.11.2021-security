import {Component, HostBinding, OnInit} from '@angular/core';
import {ValidationErrors} from "@angular/forms";

@Component({
  selector: 'ba-validation-msg',
  templateUrl: './validation-msg.component.html',
  styleUrls: ['./validation-msg.component.scss']
})
export class ValidationMsgComponent {

  text!: ValidationErrors | null;

  @HostBinding('class.invalid-feedback')
  isInvalidFeedback: boolean = true;
}
