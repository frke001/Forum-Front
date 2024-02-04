import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumCategoriesService {

  private baseUrl: string = "https://localhost:9000/api/v1/forum-categories";
  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getAllComments(id: number):Observable<any>{
    return this.http.get(this.baseUrl + '/' + id);
  }
  insertComment(id: any, request: any){
    return this.http.post(this.baseUrl + '/' + id, request);
  }
  updateComment(id: any, request: any){
    return this.http.put(this.baseUrl + '/comments/' + id, request);
  }
  deleteComment(commentId: any, userId: any){
    return this.http.delete(this.baseUrl + '/comments/' + commentId + '/' + userId);
  }
  getCategoryById(id: number){
    return this.http.get(this.baseUrl + '/category/' + id)
  }
  getAllNotApprovedComments():Observable<any>{
    return this.http.get(this.baseUrl + '/pending')
  }
  acceptComment(id:any,request:any){
    return this.http.put(this.baseUrl + '/comments/accept/' + id, request);
  }
  forbidComment(id:any){
    return this.http.delete(this.baseUrl + '/comments/forbid/' + id);
  }
}
