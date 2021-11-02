import {Component, HostBinding, Input} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable, OperatorFunction} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'ba-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent {
  @HostBinding('class.invalid-feedback')
  invalidFeedback = true;

  @Input('of')
  set control(newControl: AbstractControl | undefined | null) {
    if (newControl) {
      this.$errorMessages = newControl.statusChanges
        .pipe(
          startWith(newControl.status),
          mapFromStatusToErrorMessages(newControl),
        );
    }
  }

  $errorMessages: Observable<string[]> | undefined;
}

function mapFromStatusToErrorMessages(control: AbstractControl): OperatorFunction<string, string[]> {
  return map(status => {
    if (status === 'INVALID') {
      const errors = control.errors;
      if (errors) {
        return Object.keys(errors).map(errorCode => {
          const errorMeta = errors[errorCode];
          switch (errorCode) {
            case 'required':
              return 'Please provide a value';
            case 'maxlength':
              return `Provide value is too long (${errorMeta.actualLength})`;
            default:
              return 'Unknown error';
          }
        })
      }
    }
    return [];
  })
}
