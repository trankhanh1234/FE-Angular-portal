import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , of } from 'rxjs';
import {tap,map,catchError} from 'rxjs/operators';
import { category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriService {
  mss_gr : string ="";

  constructor(private http:HttpClient) { 
  }

  getCategory():Observable<category[]>{
    let Url="http://localhost:3000/admin/category";
    return this.http.get<category[]>(Url).pipe(
      tap(data =>{
        console.log(data);
      }),catchError(error => of([]))
      )
  }

  getCategoryById(_id):Observable<category>{
    let Url="http://localhost:3000/admin/category/"+ _id;

    return this.http.get<category>(Url).pipe(
      tap(data => {
      }),catchError(error => of)
    )
  }

  newCategory(title):Observable<category>{
    let url="http://localhost:3000/admin/category/create-cate";
    console.log(title);
    
    let options = {
      headers: new HttpHeaders().set(
          "Content-Type","application/x-www-form-urlencoded"
      )
    };
    let body = new URLSearchParams();
    body.set("title", title);
    return this.http.post<category>(url,body.toString(),options).pipe(
      tap (data => console.log(data),catchError(error => of([]))
      )
    )
  }

  editCate(id,title):Observable<category>{
    let url = "http://localhost:3000/admin//category/edit-cate/" + id;
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type","application/x-www-form-urlencoded"
      )
    };
    let body = new URLSearchParams();
    body.set("title",title);
    return this.http.put<category>(url,body.toString(),options).pipe(
      tap(data=> console.log(data),catchError(error => of([])))
    )
  }

  deleteCategory(_id): Observable<category> {
    let url = "http://localhost:3000/admin/category/delete-cate/" + _id;
    return this.http.delete<category>(url).pipe(
      tap(
        data => console.log(data),
        catchError(err => of([]))
      )
    );
}


}
