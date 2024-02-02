import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from '../../custom-snack-bar/custom-snack-bar.component';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { 

  }
  openSnackBar(message: string, action: string, success: boolean){
    // this._snackBar.open(message, action, {
    //   horizontalPosition: 'end',
    //   verticalPosition: 'top',
    //   duration: 3000,
    //   panelClass: ['snackbar']
    // });
    this._snackBar.openFromComponent(CustomSnackBarComponent, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: success ? 'snackbar-success' : 'snackbar-unsuccess',
      data: {
        message: message,
        action: action,
        snackBar: this._snackBar,
        success: success
      },
    });
  }
}
