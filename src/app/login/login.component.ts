import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, FormsModule, ReactiveFormsModule, CustomSnackBarComponent, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup;
  public submitted = false;
  public errorHappened: boolean = false;
  public username = new FormControl(null, [Validators.required]);
  public password;
  public hide = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router
    , private snackBarService: SnackbarService) {
      sessionStorage.removeItem("id");
    this.password = new FormControl(null, [Validators.required]);
    this.loginForm = this.formBuilder.group({
      password: this.password,
      username: this.username
    })
  }

  public passwordValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[0-9]/.test(password);

    return !hasUpperCase || !hasSpecialCharacter ? { invalidPassword: true } : null;
  };

  public onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login({
      username: this.username.value,
      password: this.password.value
    }).subscribe({

      next: (data) => {
        //localStorage.setItem("token", data.token);
        sessionStorage.setItem("id", data);
        this.router.navigateByUrl("/code");

      },
      error: (err) => {
        if (err.status === 401) {
          this.snackBarService.openSnackBar("Invalid credentials!", "Close", false);
        }
        if (err.status === 403) {
          this.snackBarService.openSnackBar("Your account is blocked!", "Close", false);
        }
        if (err.status === 406) {
          this.snackBarService.openSnackBar("Your account is not verified!", "Close", false);
        }
        this.loginForm.reset();
      }
    });
  }
}
