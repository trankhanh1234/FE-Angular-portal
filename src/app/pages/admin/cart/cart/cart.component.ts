import { Component, OnInit } from '@angular/core';
import { cartmodel } from 'src/app/model/cart.model';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cart : cartmodel[]=[];
search : boolean;
p=1;
  constructor(private cartservice : CartService,
    private toastr : ToastrService,
    private Router : Router) {

   }
  ngOnInit() {
    this.cartservice.getAllCart().subscribe((result :any)=>{
      if(result.result = true)
      {
        this.search = true;
        this.cart = result.data;
        
        console.log(this.cart);
        
      }
    })
  }
  
  checkStatusCart(a,mgsA,b,mgsB,c,mgsC,data){
    if (a == data) {
      return mgsA
    }else if(b == data)
      return mgsB
    else
      return mgsC

  }

  goToPageEdit(cart){
    this.Router.navigate(['/cart/' + cart])
  }
  delete(_id : string){
   // console.log(id);
    this.cartservice.deleteCart(_id).subscribe((data:any) =>{
      if(data.result == true)
      {
        this.cart = this.cart.filter(
          data => data._id !== _id
        );
        this.toastr.success('Xóa thành công!');
      }
    })
    

  }

}
