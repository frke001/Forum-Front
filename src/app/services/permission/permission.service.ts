import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private baseUrl: string = "https://localhost:9000/api/v1/permissions";
  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
