import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const codeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let result : boolean;
  if(sessionStorage.getItem("id")){
    result = true;
  }else{
    //inject(SnackBarService).openSnackBarCenter("Please sign in to continue!","Close",false)
    result = false;
  }
  return result? true : router.navigate(["/login"]);
};
