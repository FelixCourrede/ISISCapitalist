import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from '../world';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { BigvaluePipe } from '../bigvalue.pipe';
import { NONE_TYPE } from '@angular/compiler';


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
      console.log(this.product)
    }
  }

  ngOnInit() {
    setInterval(() => { this.calcScore(); }, 100);
  }

  calcScore() {
    if (timeleft == 0) { return NONE_TYPE }
    else {
      timeleft = Date.now() - this.lastupdate;
      if (timeleft <= 0) {
        timeleft = 0;
        thisprogressbarvalue = 0
      }
      else {
        this.progressbarvalue = ((this.product.vitesse -
          this.product.timeleft) / this.product.vitesse) * 100
      }
    }

  }

  @Input()
  money: number = 0

  @Output()
  notifyProduction: EventEmitter<Product> = new
    EventEmitter<Product>();


}
