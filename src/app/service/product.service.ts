import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  getAllProduct():Observable<product[]>{
    let Url="http://localhost:3000/admin/product";
    return this.http.get<product[]>(Url).pipe(
      tap(data =>{ 
      }),catchError(error => of([]))
      )
  }
  
  getProduct(_id):Observable<product>{
    let Url = "http://localhost:3000/admin/product/"+_id;
    return this.http.get<product>(Url).pipe(tap());
  }

  newProduct(fd):Observable<any>{
    let url="http://localhost:3000/admin/product/create-product";
    return this.http.post<product>(url,fd).pipe(
    )
    
  }
  deleteProduct(_id):Observable<product>{
    let url = "http://localhost:3000/admin/product/delete-product/" + _id;
    return this.http.delete<product>(url).pipe()
  }

  editProduct(product:product, fd):Observable<product>{
    let Url = 'http://localhost:3000/admin/product/edit-product/'+ product._id; 
  
    return this.http.put<product>(Url,fd).pipe(tap( data => console.log(data)
    ,catchError(error => of([])
   ))
   )
  }


}
