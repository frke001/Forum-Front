import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-custom-snack-bar',
  standalone: true,
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './custom-snack-bar.component.html',
  styleUrl: './custom-snack-bar.component.css'
})
export class CustomSnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any){

  }
  close() {
    this.data.snackBar.dismiss();
  }
}
