import { Component, inject, Input } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _cart : Cart = {items:[]}; 
  itemsQuantity = 0 ; 
  private cartService = inject(CartService) ; 
  @Input()
  get cart():Cart {
    return this._cart;
  }
  set cart(cart:Cart){
    this._cart=cart;
    
    this.itemsQuantity = cart.items
    .map((items)=> items.quantity)
    .reduce((prev,curr)=>prev+curr,0); 

  }

  getTotal(items:Array<CartItem>):number{
    return this.cartService.getTotal(items); 

  }
  onClearCart(){
    this.cartService.clearCart(); 
  }
}
