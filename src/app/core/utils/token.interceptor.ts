import { inject } from '@angular/core';
import { TokenService } from '../../services/token.service';

export function httpInterceptorFn(req: any, next: any) {
  const tokenService = inject(TokenService);
  
  req = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + tokenService.getToken(),
    },
  });
  return next(req);
}
