import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginPayload } from 'src/app/models/login-payload.interface';

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
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {}

  handleLogin(): void {
    if (this.loginForm.valid) {
      console.log('this.loginForm.value');
      console.log(this.loginForm.value);
      const loginPayload = this.loginForm.value as LoginPayload;
      this.authService.login(loginPayload);
    }
  }
}
