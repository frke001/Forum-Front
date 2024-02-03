import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let result : boolean;
  if(inject(AuthService).getRole()=="Admin"){
    result = true;
  }else{
    result = false;
  }
  return result? true : router.navigate(["/forum"]);
};
