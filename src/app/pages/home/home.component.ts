import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 }

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  private cartService = inject(CartService);
  products: Array<Product> |undefined; 
  sort= 'desc'; 
  count = '12';
  productSubcription: Subscription | undefined ; 
  private storeService = inject(StoreService);
  ngOnInit(): void {
    this.getProduct(); 
  }
  getProduct () { 
    this.productSubcription  = this.storeService.getAllProducts(this.count,this.sort,this.category).subscribe((_product)=>{
      this.products = _product; 

    })
  }
  
  onColumnsCountChange(colsNum: number) {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProduct(); 
    // console.log(this.category);

  }

  onAddToCart(product: Product) {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

  onItemCountChange(newCount:number){
    this.count = newCount.toString() ;
    this.getProduct(); 
  }

  onSortChange(newSort:string){
    this.sort= newSort; 
    this.getProduct() ; 
  }

  ngOnDestroy(): void {
    if(this.productSubcription){
      this.productSubcription.unsubscribe(); 
    }
  }
}
