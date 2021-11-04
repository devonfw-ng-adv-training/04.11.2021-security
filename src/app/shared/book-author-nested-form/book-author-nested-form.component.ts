import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlContainer, FormGroup} from "@angular/forms";

@Component({
  selector: 'ba-book-author-nested-form',
  templateUrl: './book-author-nested-form.component.html',
  styleUrls: ['./book-author-nested-form.component.scss']
})
export class BookAuthorNestedFormComponent {
  get authorFormGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }
  constructor(private readonly  controlContainer: ControlContainer) {
  }

}
