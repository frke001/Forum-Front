import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CustomSnackBarComponent } from '../custom-snack-bar/custom-snack-bar.component';
@Component({
  selector: 'app-authentication-code',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, FormsModule, ReactiveFormsModule, CustomSnackBarComponent, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './authentication-code.component.html',
  styleUrl: './authentication-code.component.css'
})
export class AuthenticationCodeComponent {

  public codeForm: FormGroup;
  code = new FormControl(null,[Validators.required, this.fourDigitNumberValidator()])

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router: Router, private snackBarService: SnackbarService){

    this.codeForm = this.formBuilder.group({
        code: this.code
    })

  }
  fourDigitNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') {
        return null; 
      }
      return /^\d{4}$/.test(value) ? null : { 'fourDigitNumber': true };
    };
  }

  onSubmit() {
    var id = sessionStorage.getItem("id");
    if(id){
    var request = {
      code: this.code.value
    }
    this.authService.checkCode(request, parseInt(id)).subscribe({
      next: (data) => {
        
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("permissions", data.permissions);
        sessionStorage.removeItem("id");
        this.router.navigateByUrl("/forum");
        
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Login failed!", "Close", false);
        this.router.navigateByUrl("/login");
      }
    })
  }else{
    this.router.navigateByUrl("/login");
  }
  }
}
