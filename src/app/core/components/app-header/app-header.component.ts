import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../../../security/services/security.service';

@Component({
  selector: 'ba-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit{
  userEmail: string | null = null;

  constructor(private readonly security: SecurityService,
              private readonly router: Router) {
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
