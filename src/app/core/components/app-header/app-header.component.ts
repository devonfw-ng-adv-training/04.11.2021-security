import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../../../security/services/security.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'ba-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit{
  userEmail: string | null = null;
  userHasRightToCreateNewBook$: Observable<boolean>;

  constructor(private readonly security: SecurityService,
              private readonly router: Router) {
    this.userHasRightToCreateNewBook$ = this.security.userHasRight('newBook');
  }

  ngOnInit(): void {
    this.security.getContext().then(context => this.userEmail = context?.email ?? null)
  }

  goToSignInDialog(): Promise<void> {
    return this.security.goToSignInDialog();
  }

  signOut(): Promise<boolean> {
    return this.security.signOut().then(() => this.router.navigateByUrl('/'));
  }
}
