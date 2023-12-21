import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class UnauthorizedErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const accessToken = error.error.accessToken;
          if (accessToken) {
            this.authService.accessToken = accessToken;
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            return next.handle(clonedRequest);
          } else {
            this.authService.logout().subscribe();
          }
        }
        return throwError(() => error);
      })
    );
  }
}
