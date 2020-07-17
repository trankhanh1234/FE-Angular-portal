import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {cartmodel} from './../model/cart.model'
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) {

    
   }
   getAllCart():Observable<cartmodel[]>{
      
    let Url = 'http://localhost:3000/admin/checkout/';
    return this.http.get<cartmodel[]>(Url).pipe();
  }
  getCartById(id):Observable<cartmodel>{
    let Url = 'http://localhost:3000/admin/checkout/' + id;
    return this.http.get<cartmodel>(Url).pipe();
  }

  deleteCart(_id): Observable<cartmodel> {
    let url = "http://localhost:3000/admin/checkout/delete-cart/" + _id;
    return this.http.delete<cartmodel>(url).pipe(
      tap(
        data => console.log(data),
        catchError(err => of([]))
      )
    );
  }
}
