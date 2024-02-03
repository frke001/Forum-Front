import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const jwtTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localToken = sessionStorage.getItem("token");
    if(localToken){
      req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localToken)});
    }
  return next(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        if(event.status === 401){
          inject(SnackbarService).openSnackBar("Unauthorized!","Close",false);
          inject(Router).navigate(["/login"]);
        }
        if(event.status === 400){
          inject(AuthService).logout();
          inject(SnackbarService).openSnackBar("Bad Request!","Close",false);
          inject(Router).navigate(["/login"]);
        }
      }
  }));
};
