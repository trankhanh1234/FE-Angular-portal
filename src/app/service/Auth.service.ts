import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login } from '../model/login.model';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { JwtHelperService } from '@auth0/angular-jwt';

class UserToken {}
class Permissions {
  canActivate(user: UserToken, id: string): boolean {
    return true;
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient,
  ) { }
  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   // Check whether the token is expired and return
  //   // true or false
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

  authLogin(fd):Observable<login>{
    let options = {
      headers: new HttpHeaders().set(
          "Content-Type","application/x-www-form-urlencoded"
      )
    };
    let Url='http://localhost:3000/auth/loginAdmin';
    let body = new URLSearchParams();
    body.set("username", fd.username);
    body.set("password", fd.password);
    
    return  this.http.post<login>(Url,body.toString(), options).pipe();
  }

}
