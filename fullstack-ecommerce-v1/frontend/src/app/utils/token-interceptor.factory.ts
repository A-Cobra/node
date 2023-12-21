import { AuthService } from '../auth/services/auth.service';
import { TokenInterceptor } from '../interceptors/token.interceptor';

export function tokenInterceptorFactory(
  authService: AuthService
): TokenInterceptor {
  return new TokenInterceptor();
}
