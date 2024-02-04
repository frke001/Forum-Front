import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:9000/api/v1/auth/";
  constructor(private http: HttpClient) { }

  register(request: any){
    return this.http.post(this.baseUrl + 'register', request);
  }

  checkDetails(request: any) : Observable<any>{
    return this.http.post(this.baseUrl + 'check-details', request);
  }

  login(request: any): Observable<any>{
    return this.http.post(this.baseUrl + 'login', request);
  }
  
  checkCode(request:any, id: number):Observable<any>{
    
    return this.http.post(this.baseUrl + 'check-code/' + id, request);
  }

  public decodeToken(): any {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        return jwt_decode.jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  public isLoggedIn(): boolean{
    const token = sessionStorage.getItem('token');
    return !!token && !this.isTokenExpired();
  }
  public isLoggedInWithoutExpire(): boolean{
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  public logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('permissions');
  }
  private getExpiryTime() {
    return this.decodeToken() ? this.decodeToken().exp : null;
  }

  public getId() {
    return this.decodeToken() ? this.decodeToken().jti : null;
  }
  public getUsername() {
    return this.decodeToken() ? this.decodeToken().sub : null;
  }
  public getRole() {
    return this.decodeToken() ? this.decodeToken().role : null;
  }
  public isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      if(((1000 * expiryTime) - (new Date()).getTime()) < 5000){
        this.logout();
        return true;
      }
      else{
        return false;
      }
    } else {
      return false;
    }
  }

  sendCode(code: any):Observable<any>{
    return this.http.get(this.baseUrl + 'oauth2/callback?code='+code);
  }
  canCreate(){
    var permisions = sessionStorage.getItem("permissions");
    return (permisions && permisions?.includes("CREATE"));
  }
  canDelete(){
    var permisions = sessionStorage.getItem("permissions");
    return (permisions && permisions?.includes("DELETE"));
  }
  canUpdate(){
    var permisions = sessionStorage.getItem("permissions");
    return (permisions && permisions?.includes("UPDATE"));
  }

}
