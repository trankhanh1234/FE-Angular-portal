import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { provider } from '../model/provider.model';


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(
    private http : HttpClient,
  ) { }

  getAllProvider():Observable<provider[]>{

    let Url = "http://localhost:3000/admin/provider";

    return this.http.get<provider[]>(Url).pipe() ;
  }
  getProviderById(id : string):Observable<provider>{
    let Url = "http://localhost:3000/admin/provider/"+id;
    return this.http.get<provider>(Url).pipe();
  }

  createPRovider(fd):Observable<any>{
    let Url = "http://localhost:3000/admin/provider/create-provider";
    return this.http.post<provider>(Url,fd).pipe(
      tap(data =>{
        console.log(data);
        
      }),catchError(err => of(new provider()))
    );
  }
  updateProvider(id, fd):Observable<provider>{
    let Url = "http://localhost:3000/admin/provider/update-provider/"+id;
    
    return this.http.put<provider>(Url,fd).pipe();
  }

  deleteProvider(id):Observable<provider>{
    let Url = "http://localhost:3000/admin/provider/delete-provider/"+id;
  return this.http.delete<provider>(Url).pipe();
  }
}
