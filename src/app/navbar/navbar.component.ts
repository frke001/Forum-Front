import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive, RouterOutlet, MatIconModule, MatToolbarModule, MatDividerModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService,private router: Router){
    
  }
  public isLoggedIn(): boolean {
    let result: boolean = this.authService.isLoggedIn();
    return result;
  }
  public getUsername(): string {
    return this.authService.getUsername();
  }
  public onLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  getRole(){
    return this.authService.getRole();
  }
}
