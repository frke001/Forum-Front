import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ForumCategoriesService } from '../services/forum-categories/forum-categories.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-message-check',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, NgbCollapseModule],
  templateUrl: './message-check.component.html',
  styleUrl: './message-check.component.css'
})
export class MessageCheckComponent {

  form: FormGroup;
  comment = new FormControl(null, [Validators.required]);
  selectedComment: any = null;
  isCollapseClosed: boolean = true;
  // editform: FormGroup;
  // comment = new FormControl(null, [Validators.required]);
  id?: number;
  comments: Array<any> = [];
  constructor(private formBuilder: FormBuilder, private forumCategoryService: ForumCategoriesService,
    private authService: AuthService, private snackBarService: SnackbarService, private router: Router) {
    this.form = this.formBuilder.group({
      comment: this.comment
    })

    this.forumCategoryService.getAllNotApprovedComments().subscribe({
      next: (data) => {
        this.comments = data;
        console.log(data);

      },
      error: (err) => {
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    })

  }

  onEdit(comment: any) {
    this.isCollapseClosed = false;
    this.selectedComment = comment;
    this.form.patchValue({
      comment: this.selectedComment.text
    });
  }
  onSave() {
    var request = {
      text: this.comment.value
    }
    this.forumCategoryService.acceptComment(this.selectedComment.id, request).subscribe({
      next: (data) => {
        this.comments = this.comments.filter(c => c.id != this.selectedComment.id);
        this.isCollapseClosed = true;
        this.form.reset();
        this.snackBarService.openSnackBar("Successful operation!", "Close", true);
      },
      error: (err) => {

        if (err.status === 400) {
          this.snackBarService.openSnackBar("Bad request!", "Close", false);
          this.authService.logout();
          this.router.navigate(["/login"]);
        } else {
          this.snackBarService.openSnackBar("Unsuccessful operation!", "Close", false);
          this.form.reset();
        }
      }
    })
  }
  onCancel() {
    this.form.reset();
    this.isCollapseClosed = !this.isCollapseClosed;
    this.selectedComment = null;
  }

  onDelete(id: number) {
    this.forumCategoryService.forbidComment(id).subscribe({
      next: (data) => {
        this.comments = this.comments.filter(c => c.id != id);
        this.snackBarService.openSnackBar("Successful operation!", "Close", true);
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Unsuccessful operation!", "Close", false);
      }
    })
  }
  getUserId() {

    return this.authService.getId();
  }
}
