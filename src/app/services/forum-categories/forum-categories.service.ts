import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumCategoriesService {

  private baseUrl: string = "http://localhost:9000/api/v1/forum-categories";
  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
