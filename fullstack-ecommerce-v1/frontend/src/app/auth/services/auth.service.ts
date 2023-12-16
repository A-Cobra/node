import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = false;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this._isLoggedIn);
  private isLoggedOutSubject = new BehaviorSubject<boolean>(!this._isLoggedIn);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isLoggedOut$ = this.isLoggedOutSubject.asObservable();

  login() {
    // TODO: Write logic
    this._isLoggedIn = true;
    this.emitNewLoggedInOutValues();
  }

  logout() {
    this._isLoggedIn = false;
    this.emitNewLoggedInOutValues();
  }

  private emitNewLoggedInOutValues() {
    this.isLoggedInSubject.next(this._isLoggedIn);
    this.isLoggedOutSubject.next(!this._isLoggedIn);
  }

  constructor() {}
}
