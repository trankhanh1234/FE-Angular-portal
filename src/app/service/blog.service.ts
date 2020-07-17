import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlogModel } from '../model/blog.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http : HttpClient) { }
  getAllBlog():Observable<BlogModel[]>{
    let Url="http://localhost:3000/admin/blog";
    return this.http.get<BlogModel[]>(Url).pipe(
      tap(data =>{ 
      }),catchError(error => of([]))
      )
  }
  getBlogById(_id):Observable<BlogModel>{
    let Url="http://localhost:3000/admin/blog/"+ _id;

    return this.http.get<BlogModel>(Url).pipe(
      tap(data => {
      }),catchError(error => of)
    )
  }

  newBlog(fd):Observable<any>{
    let url="http://localhost:3000/admin/blog/create-blog";
    return this.http.post<BlogModel>(url,fd).pipe(
    )
  }
  deleteBlog(_id):Observable<BlogModel>{
    let url = "http://localhost:3000/admin/blog/delete-blog/" + _id;
    return this.http.delete<BlogModel>(url).pipe()
  }

  editBlog(blog:BlogModel, fd):Observable<BlogModel>{
    let Url = 'http://localhost:3000/admin//blog/edit-blog/'+ blog._id; 
  
    return this.http.put<BlogModel>(Url,fd).pipe(tap( data => console.log(data)
    ,catchError(error => of([])
   ))
   )
  }
  
}
