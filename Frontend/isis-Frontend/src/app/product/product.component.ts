import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from '../world';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { BigvaluePipe } from '../bigvalue.pipe';
import { NONE_TYPE } from '@angular/compiler';
import { MyProgressBarComponent, Orientation } from '../progressbar.component'



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatProgressBarModule, MyProgressBarComponent, BigvaluePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnChanges {

  @Input()
  product: Product = new Product()

  progressbarvalue = 0

  run = false
  auto = false
  initialValue = 0
  orientation = Orientation.horizontal

  button = document.querySelector("button" + Product.name);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      console.log('La valeur a changé de', changes['product'].previousValue, 'à', changes['product'].currentValue);
      console.log(this.product)
    }
  }

  startFabrication() {
    this.run = true
  }

  ngOnInit() {
    setInterval(() => { this.calcScore(); }, 100);
  }


  calcScore() {
    if (this.product.timeleft == 0) { }
    else {
      let elapsetime = Date.now() - this.product.lastupdate;
      this.product.lastupdate = Date.now()
      this.product.timeleft = elapsetime
      if (this.product.timeleft <= 0) {
        this.product.timeleft = 0;
        this.run = false
        // on prévient le composant parent que ce produit a généré son revenu.
        this.notifyProduction.emit(this.product);
      }
    }
  }

  @Input()
  money: number = 0

  @Output()
  notifyProduction: EventEmitter<Product> = new
    EventEmitter<Product>();
}
