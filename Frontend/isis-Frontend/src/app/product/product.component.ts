import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../world';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { BigvaluePipe } from '../bigvalue.pipe';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatProgressBarModule, BigvaluePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnChanges {

  @Input()
  product: Product = new Product()

  progressbarvalue = 0

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      console.log('La valeur a changé de', changes['product'].previousValue, 'à', changes['product'].currentValue);
    }
  }

  @Input()
  money: number = 0


}
