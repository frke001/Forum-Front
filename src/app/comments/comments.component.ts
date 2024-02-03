import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ForumCategoriesService } from '../services/forum-categories/forum-categories.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MatButtonModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule,NgbCollapseModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  form: FormGroup;
  comment = new FormControl(null, [Validators.required]);
  selectedComment: any = null;
  isCollapseClosed: boolean = true;
  // editform: FormGroup;
  // comment = new FormControl(null, [Validators.required]);
  id?: number;
  comments: Array<any> = [];
  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private forumCategoryService: ForumCategoriesService,
     private authService:AuthService, private snackBarService:SnackbarService){
    this.form = this.formBuilder.group({
      comment: this.comment
    })
    this.route.params.subscribe(params => {
        this.id = params['id'];
        if( this.id){
          this.forumCategoryService.getAllComments(this.id).subscribe({
            next: (data)=>{
              this.comments = data;
              console.log(this.comments);
              
            },
            error: (err)=>{
              this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
            }
          })
        }
    });
  }

  onAdd() {
    var request = {
      userSenderId: this.authService.getId(),
      text: this.comment.value
    }
    this.forumCategoryService.insertComment(this.id, request).subscribe({
      next: (data)=>{
        this.snackBarService.openSnackBar("Successful operation!", "Close", true);
        this.isCollapseClosed = true;
        this.form.reset();
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
        this.form.reset();
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
      userSenderId: this.authService.getId(),
      text: this.comment.value
    }
    this.forumCategoryService.updateComment(this.selectedComment.id, request).subscribe({
      next: (data)=>{
        this.comments = this.comments.filter(c=> c.id != this.selectedComment.id);
        this.isCollapseClosed = true;
        this.form.reset();
        this.snackBarService.openSnackBar("Successful operation!", "Close", true);
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Unsuccessful operation!", "Close", false);
        this.form.reset();
      }
    })
  }
  onAddCollapse() {
    this.form.reset();
    this.isCollapseClosed = !this.isCollapseClosed;
    this.selectedComment = null;
  }
  onDelete(id: number) {
    this.forumCategoryService.deleteComment(id, this.authService.getId()).subscribe({
      next: (data)=>{
        this.comments = this.comments.filter(c=> c.id != id);
        this.snackBarService.openSnackBar("Successful operation!", "Close", true);
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Unsuccessful operation!", "Close", false);
      }
    })
  }
  getUserId(){
    
    return this.authService.getId();
  }
}
