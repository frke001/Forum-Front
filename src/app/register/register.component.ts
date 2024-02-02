import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth/auth.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, RouterLink,FormsModule, ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordsMissmath: boolean = true;
  mailOk: boolean = true;
  usernameOk: boolean = true;
  name = new FormControl(null, [Validators.required]);
  surname = new FormControl(null, [Validators.required]);
  mail = new FormControl(null, [Validators.required, Validators.email]);
  username = new FormControl(null, [Validators.required]);
  password;
  retypePassword;
  hide = true;
  hideRetype = true;
  
  constructor(private formBuilder: FormBuilder,private authService: AuthService, private snackService: SnackbarService){

    sessionStorage.removeItem("id");
    this.password = new FormControl(null, [Validators.required, Validators.minLength(8), this.passwordValidator]);
    this.retypePassword = new FormControl(null, [Validators.required, Validators.minLength(8), this.passwordValidator]);
    this.registerForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      username: this.username,
      password: this.password,
      retypePassword: this.retypePassword,
      mail: this.mail,
    })
    
  }

  passwordValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[0-9]/.test(password);
  
    return !hasUpperCase || !hasSpecialCharacter ? { invalidPassword: true } : null;
  };


  onRetypePasswordChange(event : any) {
    const password = this.password.value;
    const retypePassword = this.retypePassword.value;
    this.passwordsMissmath = password !== retypePassword;
  }
  onSubmit(){
    var registerClient = {
      name: this.name.value,
      surname: this.surname.value,
      mail: this.mail.value,
      username: this.username.value,
      password: this.password.value,
    }
    this.authService.register(registerClient).subscribe({
      next: (data) => {
        this.snackService.openSnackBar("Successful registration!","Close", true);
      },
      error: (err) => {
        this.snackService.openSnackBar("Unsuccessful registration!","Close", false);
      }
    });
    this.registerForm.reset();

  }

  onUsernameInput(){
    this.authService.checkDetails({
      username: this.username.value,
    }).subscribe((data)=>{
       this.usernameOk = !data;
    });
  }
  onMailInput(){
    this.authService.checkDetails({
      mail: this.mail.value,
    }).subscribe((data)=>{
      this.mailOk = !data;
    });
  }
}
