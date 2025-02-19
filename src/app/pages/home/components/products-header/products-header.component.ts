import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  standalone: false,
  templateUrl: './products-header.component.html',
  styleUrl: './products-header.component.css'
})
export class ProductsHeaderComponent {
   sort = 'desc'; 
   itemShowCount= 12 ;
   @Output() columnsCountChange = new EventEmitter<number>(); 
   @Output() itemsCountChange = new EventEmitter<number>(); 
   @Output() sortChange = new EventEmitter<string>(); 
   onSortUpdated(newSort:string){
      this.sort= newSort;
      this.sortChange.emit(newSort);
   }
   onItemsUpdated(count:number){
    this.itemShowCount=count; 
    this.itemsCountChange.emit(count) ;
   }
   onColumnsUpdated(colsNum:number){
    this.columnsCountChange.emit(colsNum) ;
   }
}
