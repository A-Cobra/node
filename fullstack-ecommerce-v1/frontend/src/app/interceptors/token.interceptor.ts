import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Intercepting request');
    // const accessToken = this.authService.accessToken;
    const accessToken = localStorage.getItem('accessToken') ?? '';
    // const refreshToken = this.authService.refreshToken;
    const refreshToken = localStorage.getItem('refreshToken') ?? '';
    console.log('accessToken');
    console.log(accessToken);
    console.log('refreshToken');
    console.log(refreshToken);
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    if (refreshToken) {
      let body = req.body || {};
      body = { ...body, refreshToken };

      req = req.clone({
        body: body,
      });
    }
    return next.handle(req);
  }
}
