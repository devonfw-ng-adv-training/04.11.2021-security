import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicValidationOutputComponent } from './basic-validation-output.component';

describe('BasicValidationOutputComponent', () => {
  let component: BasicValidationOutputComponent;
  let fixture: ComponentFixture<BasicValidationOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicValidationOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicValidationOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
