import { Component } from '@angular/core';
import { ForumCategoriesService } from '../services/forum-categories/forum-categories.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {

  categories: Array<any> = [];
  constructor(private forumCategoriesService:ForumCategoriesService, private snackBarService: SnackbarService){
    this.forumCategoriesService.getAll().subscribe({
      next: (data)=>{
        this.categories = data;
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    });
  }
}
