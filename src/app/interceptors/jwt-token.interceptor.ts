import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

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
      }
  }));
};
