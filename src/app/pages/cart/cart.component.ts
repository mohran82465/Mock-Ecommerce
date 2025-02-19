import { Component, inject, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private cartService= inject(CartService); 
  private http = inject(HttpClient);
  cart: Cart = {
    items: [
      {
        product: 'https://placehold.co/400',
        name: 'snickers',
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: 'https://placehold.co/400',
        name: 'snickers',
        price: 150,
        quantity: 3,
        id: 1,
      },
    ]
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
     'name', 'price', 'quantity', 'total', 'action'
  ]
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart)=>{
      this.cart=_cart
      this.dataSource = this.cart.items;
    })
  }
  getTotal(items:Array<CartItem>):number{
      return this.cartService.getTotal(items); 
  }
  onClearCart(){
    this.cartService.clearCart()
  }
  onRemoveFromCart(item:CartItem){
    this.cartService.removeFromCart(item)
  }
  onAddQuantity(item:CartItem){
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item:CartItem){
    this.cartService.removeQuantity(item); 
  }
  onCheckout(){}
}

