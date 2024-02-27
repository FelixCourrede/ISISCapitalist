import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../world';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnChanges {

  @Input()
  product: Product = new Product()

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      console.log('La valeur a changé de', changes['product'].previousValue, 'à', changes['product'].currentValue);
    }
  }

  @Input()
  money: number = 0


}
