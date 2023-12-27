import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginPayload } from 'src/app/models/login-payload.interface';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.email], []],
    password: ['', [], []],
  });

  messages: { [key: string]: string } = {
    success: 'User logged in correctly',
    401: 'Wrong credentials',
    500: 'Server Error, please try again later',
  };

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  handleLogin(): void {
    if (this.loginForm.valid) {
      const loginPayload = this.loginForm.value as LoginPayload;
      this.authService.login(loginPayload).subscribe({
        next: data => {
          this.snackbar.open(this.messages['success'], undefined, {
            duration: 3500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate(['/products']);
        },
        error: err => {
          const status = `${err.status}`;
          this.snackbar.open(this.messages[status], undefined, {
            duration: 3500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      });
    }
  }
}
