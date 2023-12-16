import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log('ON GUARD');
    // return true;
    this.authService.isLoggedOut$.subscribe({
      next: isLoggedOut => {
        if (!isLoggedOut) {
          this.router.navigate(['/products']);
          return false;
        }
        return true;
      },
    });

    return true;
  }
}
