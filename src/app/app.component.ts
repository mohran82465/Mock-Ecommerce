import { Component, inject, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  cart:Cart = {items:[]}
  private cartService = inject(CartService); 
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart)=>{
      this.cart = _cart; 
    })
  }

}
