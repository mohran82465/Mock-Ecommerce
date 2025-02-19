import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: false,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent  implements OnInit, OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  private sotreService = inject(StoreService); 
  categories : Array<string> | undefined ; 
  catSubscription: Subscription | undefined; 
  ngOnInit(): void {
    this.catSubscription = this.sotreService.getAllCategories().subscribe((data)=>{
      this.categories = data; 
    })
  }
  onShowCategory(catogory: string) {
    // console.log(catogory);
    this.showCategory.emit(catogory);

  }
  ngOnDestroy(): void {
    if(this.catSubscription){
      this.catSubscription.unsubscribe() ; 
    }
  }

}
