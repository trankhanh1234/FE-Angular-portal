import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { adminmodel } from '../model/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getAllAdmin():Observable<adminmodel[]>{
    let Url = 'http://localhost:3000/admin/admin';
    return this.http.get<adminmodel[]>(Url).pipe();
  }

  getAdminById(_id):Observable<adminmodel>{
    let Url="http://localhost:3000/admin/admin/"+ _id;

    return this.http.get<adminmodel>(Url).pipe(
      tap(data => {
      }),catchError(error => of)
    )
  }

  newAdmin(fd):Observable<adminmodel>{
    let Url = 'http://localhost:3000/admin/admin/create-admin';
    
    return this.http.post<adminmodel>(Url,fd).pipe( tap (data => console.log(data),catchError(error => of([]))
    ));
    
  }
  uploadAdmin(id, fd):Observable<adminmodel>{
    let Url = 'http://localhost:3000/admin/admin/update-admin/'+id;
    let options = {
      headers: new HttpHeaders().set(
          "Content-Type","application/x-www-form-urlencoded"
      )
    };
    return this.http.put<adminmodel>(Url,fd,options).pipe( tap (data => console.log(data),catchError(error => of([]))
    ));
    
  }

  deleteAdmin(id :string):Observable<adminmodel>{
    let Url = "http://localhost:3000/admin/admin/delete-admin/"+id;

    return this.http.delete<adminmodel>(Url).pipe();
  }


}
