import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
          <a class="danger" *ngIf="isLoggedIn$ | async" (click)="onLogOut()"
            >Log Out</a
          >
        </li>
      </ul>
    </nav>
  `,
})
export class NavigationBarComponent implements OnInit {
  private messages = {
    success: 'User logged out successfully',
    error: 'There was an error with the server, please try again later',
  };
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  isLoggedIn$!: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  onLogOut(): void {
    const snackBarRef = this.snackBar.open(
      'Are you sure you want to log out?',
      'YES',
      {
        duration: 3500,
        verticalPosition: this.verticalPosition,
        horizontalPosition: this.horizontalPosition,
      }
    );
    snackBarRef.onAction().subscribe({
      next: () => {
        this.authService.logout().subscribe({
          next: () => {
            this.snackBar.open(this.messages['success'], undefined, {
              duration: 3500,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          },
          error: () => {
            this.snackBar.open(this.messages['error'], undefined, {
              duration: 3500,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          },
        });
      },
    });
  }
}
