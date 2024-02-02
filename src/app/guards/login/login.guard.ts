import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).isLoggedIn()){
    return inject(Router).navigate(['/forum']);
  }
  return true;
};
