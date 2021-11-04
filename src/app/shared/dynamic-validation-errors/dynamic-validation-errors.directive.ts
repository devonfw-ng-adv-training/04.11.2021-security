import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  Self,
  ViewContainerRef
} from '@angular/core';
import {NgControl} from "@angular/forms";
import {defer, merge, of} from "rxjs";
import {filter} from "rxjs/operators";
import {ValidationMsgComponent} from "../validation-msg/validation-msg.component";

@Directive({
  selector: '[formControl],[formControlName]'
})
export class DynamicValidationErrorsDirective implements OnInit {
 ref: ComponentRef<ValidationMsgComponent> | undefined;
  constructor(@Self() private readonly control: NgControl,
              private resolver: ComponentFactoryResolver,
              private vcr: ViewContainerRef,
              private renderer: Renderer2,
              private hostEl: ElementRef<HTMLFormElement>) {
  }

  ngOnInit(): void {
    const validity$ = merge(
      defer(() => of(this.control?.status)),
      this.control?.statusChanges as any
    )

    const invalid$ = validity$.pipe(filter(() => this.control.invalid as boolean && this.control.dirty as boolean))
    const valid$ = validity$.pipe(filter(() => this.control.valid as boolean));


    invalid$.subscribe(() => this.renderErrors());
    valid$.subscribe(() => this.destroyErrors());
  }


  private renderErrors() {
    if(!this.ref){
      const factory = this.resolver.resolveComponentFactory(ValidationMsgComponent);
      this.ref = this.vcr.createComponent(factory);
      this.renderer.addClass(this.hostEl.nativeElement, "is-invalid");
    }
    this.ref.instance.text = this.control.errors;
  }

  private destroyErrors() {
    if(this.ref) {
      this.ref.destroy();
      this.ref=undefined;
      this.renderer.removeClass(this.hostEl.nativeElement, "is-invalid");
    }
  }
}
