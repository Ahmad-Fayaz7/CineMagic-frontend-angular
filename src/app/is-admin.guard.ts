import { CanActivateFn, Router } from '@angular/router';
import { SecurityService } from './components/security/security.service';
import { inject, Inject } from '@angular/core';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const securityService = inject(SecurityService);
  const router = inject(Router);
  if (securityService.getRole() === 'admin') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
