import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './page-template.component.html',
  styleUrl: './page-template.component.css'
})
export class PageTemplateComponent {

}
