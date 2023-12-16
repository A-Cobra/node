import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = false;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this._isLoggedIn);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login() {
    // TODO: Write logic
    this.isLoggedInSubject.next(true);
  }

  logout() {
    this.isLoggedInSubject.next(false);
  }

  constructor() {}
}
