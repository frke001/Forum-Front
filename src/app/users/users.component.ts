import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {MatChipInputEvent, MatChipListboxChange, MatChipsModule} from '@angular/material/chips';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PermissionService } from '../services/permission/permission.service';
import { UsersService } from '../services/users/users.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButton,MatChipsModule,MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {



  users: Array<any> = [];

  permissionsList: Array<any> = [];

  constructor(private permissionService: PermissionService, private usersService: UsersService, private snackBarService: SnackbarService){
    this.permissionService.getAll().subscribe({
      next: (data)=>{
        this.permissionsList = data;        
      },
      error: (err)=>{

      }
    });
    this.usersService.getAll().subscribe({
      next: (data)=>{
        this.users = this.initializeUsersPermissions(data);

        
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Error during communication with server!", "Close", false);
      }
    })
  }
  initializeUsersPermissions(permissionsData: any[]): Array<any> {
    var temp = permissionsData.map(user => { 
      const permissionsControl = new FormControl(user.permissions.map( (permission: any) => permission.name));
      return { ...user, permissionsControl };
    });
    return temp;
    
  }

  onBlockUnblock(id: number) {
    this.usersService.blockUnblock(id).subscribe({
      next: (data)=>{
        this.snackBarService.openSnackBar("Successfull operation!", "Close", true);
        const userIndex = this.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        this.users[userIndex].blocked = !this.users[userIndex].blocked;
      }
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Unsuccessfull operation!", "Close", false);
      }
    })
  }
  onApprove(id: number) {
    this.usersService.approve(id).subscribe({
      next: (data)=>{
        this.snackBarService.openSnackBar("Successfull operation!", "Close", true);
        const userIndex = this.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        this.users[userIndex].verified = true;
      }
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Unsuccessfull operation!", "Close", false);
      }
    })
  }
  onRoleChange(event: MatChipListboxChange, id: any): void {
    var selectedRole = event.value;
   
  
    const user = this.users.find(user => user.id === id);
    
    if((typeof(event.value) === 'undefined')){
      selectedRole = user.role;
    }
      var request = { role: selectedRole }
      
      this.usersService.changeRole(request, id).subscribe({
        next: (data) => {
          this.snackBarService.openSnackBar("Successful operation!", "Close", true);
          user.role = selectedRole;
          
          
        },
        error: (err) => {
          this.snackBarService.openSnackBar("Unsuccessful operation!", "Close", false);
        }
      });
    
  }
 
  onPermissionChange(event: any,id: any) {
    console.log(event.value);
    console.log(id); 
    var ids: Array<any> = [];
    event.value.forEach((el:any)=>{
      ids.push(this.getPermissionId(el));
    })
    var request = {
      permissions: ids
    }
    this.usersService.changePermissions(request, id).subscribe({
      next: (data) => {
        this.snackBarService.openSnackBar("Successful operation!", "Close", true);
        
      },
      error: (err) => {
        this.snackBarService.openSnackBar("Unsuccessful operation!", "Close", false);
      }
    });
    
    
  }
  getPermissionId(name: string){
    const permission = this.permissionsList.find(p => p.name === name);
    return permission.id;
  }
}
