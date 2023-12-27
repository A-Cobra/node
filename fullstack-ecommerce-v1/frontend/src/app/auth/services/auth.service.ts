import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  of,
  tap,
} from 'rxjs';
import { LoginPayload } from 'src/app/models/login-payload.interface';
import { SuccessfulLoginResponse } from 'src/app/models/successful-login-response.interface';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiAuthUrl;
const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_KEY = 'accessToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = false;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this._isLoggedIn);
  private isLoggedOutSubject = new BehaviorSubject<boolean>(!this._isLoggedIn);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isLoggedOut$ = this.isLoggedOutSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<SuccessfulLoginResponse> {
    return this.http
      .post<SuccessfulLoginResponse>(`${API_URL}/auth/log-in`, payload)
      .pipe(
        tap(loginResponse => {
          const tokens = loginResponse.data;
          this._isLoggedIn = true;
          this.emitNewLoggedInOutValues();
          localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshAccessToken);
          localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
        })
      );
  }

  logout(): Observable<null> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return of(null);
    }
    return this.http
      .delete<null>(`${API_URL}/auth/log-out`, { body: { refreshToken } })
      .pipe(
        tap(() => {
          this._isLoggedIn = false;
          this.emitNewLoggedInOutValues();
          this.removeAuthTokens();
        })
      );
  }

  private emitNewLoggedInOutValues() {
    this.isLoggedInSubject.next(this._isLoggedIn);
    this.isLoggedOutSubject.next(!this._isLoggedIn);
  }

  verifyExistingRefreshTokenInLocalStorage(): void {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      this._isLoggedIn = false;
      this.emitNewLoggedInOutValues();
      this.removeAuthTokens();
      return;
    }
    this.http
      .post(`${API_URL}/auth/verify-refresh-token`, null)
      .pipe(
        finalize(() => {
          this.emitNewLoggedInOutValues();
        })
      )
      .subscribe({
        next: () => {
          this._isLoggedIn = true;
        },
        error: err => {
          this._isLoggedIn = false;
          this.removeAuthTokens();
        },
      });
  }

  private removeAuthTokens() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  get accessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
  }

  get refreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY) ?? '';
  }

  set accessToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
}
