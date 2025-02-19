import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../models/product.model';

@Component({
  selector: '[app-product-box]',
  standalone: false,
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {

  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();
  @Input() product: Product | undefined;

  onAddToCart() {
    this.addToCart.emit(this.product);
  }

}
