import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = "https://localhost:9000/api/v1/users";
  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.baseUrl);
  }

  blockUnblock(id: number){
    return this.http.put(this.baseUrl + '/block/' + id, {});
  }
  approve(id: number){
    return this.http.put(this.baseUrl + '/approve/' + id, {});
  }
  changeRole(request:any, id: number){
    return this.http.put(this.baseUrl + '/role/' + id, request);
  }
  changePermissions(request:any, id: number){
    return this.http.put(this.baseUrl + '/permission/' + id, request);
  }
}
