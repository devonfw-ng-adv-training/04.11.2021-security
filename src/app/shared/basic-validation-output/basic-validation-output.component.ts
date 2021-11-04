import {AfterContentInit, Component, ContentChild, ContentChildren, HostBinding, Input, OnInit} from '@angular/core';
import {AbstractControl, NgControl, ValidationErrors} from "@angular/forms";
import {defer, merge, Observable, of} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {BookDetailsComponent} from "../../book/components/book-details/book-details.component";

interface CustomError{
name: string;
context: any;
}
@Component({
  selector: 'ba-basic-validation-output',
  templateUrl: './basic-validation-output.component.html',
  styleUrls: ['./basic-validation-output.component.scss']
})
export class BasicValidationOutputComponent  implements  AfterContentInit{
  @ContentChild(NgControl)
  validationControl!: AbstractControl | null;

  errors$: Observable<CustomError[]> | undefined;

  ngAfterContentInit(): void {
    this.errors$ = merge(
          defer(()=>of(this.validationControl?.status)),
          this.validationControl?.statusChanges as any
    )
      .pipe(
        map(status => {
        if( status === 'INVALID'){
          const errors: ValidationErrors | undefined|null = this.validationControl?.errors;
         return errors?  Object.entries(errors)
           .reduce((prev, [name, context])=> [...prev, {name,context}], [] as CustomError[]) : [];
        }
        return [];
      }));
  }

}
