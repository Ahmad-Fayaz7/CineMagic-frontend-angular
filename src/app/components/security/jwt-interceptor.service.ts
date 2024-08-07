// JwtInterceptorService

import { HttpInterceptorFn } from '@angular/common/http';
import { SecurityService } from './security.service';
import { inject } from '@angular/core';

export const JwtInterceptorService: HttpInterceptorFn = (req, next) => {
  const securityService = inject(SecurityService);

  const authToken = securityService.getToken();

  if (authToken) {
    // Clone the request and add the authorization header
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  // Pass the cloned request with the updated header to the next handler
  return next(req);
};
