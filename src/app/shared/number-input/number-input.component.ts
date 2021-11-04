import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'ba-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberInputComponent,
      multi: true
    }
  ]
})
export class NumberInputComponent implements ControlValueAccessor, AfterViewInit{
  disabled: boolean = false;

  @ViewChild('input')
  input: ElementRef | undefined;

  private value: number| undefined =undefined;

  ngAfterViewInit(){
    if(this.input){
      this.input.nativeElement.value = this.value;
    }
  }

  onChange = (value: number | undefined)=>{}
  onTouched = ()=>{}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: number): void {
    if(this.input) {
      this.input.nativeElement.value = `${obj}`;
    }
    this.value = obj;
  }
  userInput(event:any) {
    this.value = this.input?.nativeElement.value;
    this.onChange( this.value)
  }

  isAllowed(event: KeyboardEvent): boolean{
    return !!event.key.match(/[0-9]/);
  }
}
