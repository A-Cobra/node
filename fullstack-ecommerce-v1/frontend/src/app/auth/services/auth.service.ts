import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { LoginPayload } from 'src/app/models/login-payload.interface';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = false;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this._isLoggedIn);
  private isLoggedOutSubject = new BehaviorSubject<boolean>(!this._isLoggedIn);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isLoggedOut$ = this.isLoggedOutSubject.asObservable();

  login(payload: LoginPayload) {
    this.http
      .post(`${API_URL}/auth/log-in`, payload)
      .pipe(
        tap(data => {
          console.log('DATA FROM PIPE');
          console.log(data);
          this._isLoggedIn = true;
          this.emitNewLoggedInOutValues();

          // Save tokens in local storage
        })
      )
      .subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {
          console.log(err);
        },
      });
    // TODO: Write logic
  }

  logout() {
    this._isLoggedIn = false;
    this.emitNewLoggedInOutValues();
  }

  private emitNewLoggedInOutValues() {
    this.isLoggedInSubject.next(this._isLoggedIn);
    this.isLoggedOutSubject.next(!this._isLoggedIn);
  }

  constructor(private http: HttpClient) {}
}
