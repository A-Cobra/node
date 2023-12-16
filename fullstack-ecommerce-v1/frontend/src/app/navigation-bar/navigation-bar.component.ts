import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  styleUrls: ['./navigation-bar.component.scss'],
  template: `
    <nav>
      <ul>
        <li>
          <a
            routerLinkActive="active"
            [routerLink]="['/products']"
            [routerLinkActiveOptions]="{ exact: true }"
            >Products</a
          >
          <a routerLinkActive="active" [routerLink]="['/products', 'create']"
            >Create Product</a
          >
          <a
            *ngIf="!(isLoggedIn$ | async)"
            routerLinkActive="active"
            [routerLink]="['/auth', 'login']"
            >Log In</a
          >
        </li>
      </ul>
    </nav>
  `,
})
export class NavigationBarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}
