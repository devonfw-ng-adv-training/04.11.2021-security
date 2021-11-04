import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicValidationErrorsDirective } from './dynamic-validation-errors.directive';

describe('DynamicValidationErrorsComponent', () => {
  let component: DynamicValidationErrorsDirective;
  let fixture: ComponentFixture<DynamicValidationErrorsDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicValidationErrorsDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicValidationErrorsDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
