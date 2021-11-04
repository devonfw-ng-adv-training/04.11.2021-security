import {Directive, HostBinding, OnInit, Self} from '@angular/core';
import {NgControl} from "@angular/forms";
import {defer, merge, of} from "rxjs";

@Directive({
  selector: '[baIsInvalidClass]'
})
export class IsInvalidClassDirective implements  OnInit{

  @HostBinding('class.is-invalid')
  isInvalidClass: boolean = false;

  constructor(@Self() private readonly control: NgControl) {
  }

  ngOnInit() {
    merge(
      defer(()=>of(this.control?.status)),
      this.control?.statusChanges as any
    ).subscribe((status)=> this.isInvalidClass = status === 'INVALID' );
  }
}
