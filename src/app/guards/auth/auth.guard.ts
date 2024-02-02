import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let result : boolean;
  if(inject(AuthService).isLoggedIn()){
    result = true;
  }else{
    inject(SnackbarService).openSnackBar("Please sign in to continue!","Close",false)
    result = false;
  }
  return result? true : router.navigate(["/login"]);
};
