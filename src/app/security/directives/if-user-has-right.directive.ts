import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {NgIf} from '@angular/common';
import {SecurityService} from '../services/security.service';
import {UserRight} from '../model';
import {takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[baIfUserHasRight]'
})
export class IfUserHasRightDirective extends NgIf implements OnDestroy {
  private readonly subscribe = new Subject();

  constructor(
    viewContainer: ViewContainerRef,
    templateRef: TemplateRef<any>,
    private readonly security: SecurityService) {
    super(viewContainer, templateRef);
  }

  @Input() set baIfUserHasRight(right: UserRight) {
    this.security.userHasRight(right)
      .pipe(takeUntil(this.subscribe))
      .subscribe(isAuthorized => {
        this.ngIf = isAuthorized;
      });
  }

  @Input() set baIfUserHasRightElse(templateElse: TemplateRef<any>) {
    this.ngIfElse = templateElse;
  }

  @Input() set baIfUserHasRightThen(templateThen: TemplateRef<any>) {
    this.ngIfThen = templateThen;
  }

  ngOnDestroy(): void {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
