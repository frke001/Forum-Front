import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit{

  constructor(private route: ActivatedRoute, private authService:AuthService, private snackBarService:SnackbarService, private router: Router) { }


  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    console.log('Code:', code);
    this.authService.sendCode(code).subscribe({
      next: (data)=>{
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("permissions", data.permissions);
        this.router.navigateByUrl("/forum");
      },
      error: (err)=>{
        if (err.status === 403) {
          this.snackBarService.openSnackBar("Your account is not blocked!", "Close", false);
        }else{
          this.snackBarService.openSnackBar("Unsuccessful operation!", "Close", false);
        }
        this.router.navigateByUrl("/login");
      }
    });
  }

  
}
