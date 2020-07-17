import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { cartmodel } from 'src/app/model/cart.model';

@Component({
  selector: 'app-edit-cart',
  templateUrl: './edit-cart.component.html',
  styleUrls: ['./edit-cart.component.scss']
})
export class EditCartComponent implements OnInit {
  cart = cartmodel;
  

  constructor(private route :ActivatedRoute,
    private cartservice : CartService) { }

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('idCart');
    this.cartservice.getCartById(id).subscribe((result : any)=>
    {
        if(result.result == true){
          this.cart = result.data;
          console.log(this.cart);
          
        }
    })

  }

}
