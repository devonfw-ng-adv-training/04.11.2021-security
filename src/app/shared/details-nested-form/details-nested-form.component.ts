import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator,
  Validators
} from "@angular/forms";
import {BookDetails} from "../../book/model/book";

@Component({
  selector: 'ba-details-nested-form',
  templateUrl: './details-nested-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DetailsNestedFormComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DetailsNestedFormComponent,
      multi: true
    }
  ]
})
export class DetailsNestedFormComponent implements ControlValueAccessor, Validator {
  public detailsForm: FormGroup =
    this.fb.group({
      publishedYear: [null, [Validators.required]],
      isbn: [null, [Validators.required, Validators.maxLength(13)]],
    });
  constructor(private readonly fb:FormBuilder) {
  }

  onTouched = ()=>{}
  registerOnChange(fn: any): void {
    this.detailsForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled?  this.detailsForm.disable() : this.detailsForm.enable();
  }

  writeValue(obj: BookDetails): void {
    this.detailsForm.setValue(obj, {emitEvent: true});
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.detailsForm.invalid ? {detailsNestedFormInvalid: 'errors'}: null;
  }
}
