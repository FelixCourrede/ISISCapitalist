import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product, Palier, World } from '../world';
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

  product: Product = new Product()
  @Input()
  set prod(value: Product) {
    this.product = value;
    if (!this.product) { this.product = new Product() }
  }

  progressbarvalue = 0
  maxAchat = 0

  _commutateur:any;
  @Input()
  set commutateur(value: any){
  this._commutateur=value
  if(this._commutateur && this.product) this.calcMaxCanBuy();
 
  }


calcMaxCanBuy(){
  let max=(this.product.croissance**this.product.quantite)*this.product.cout;
  console.log(max)
  this.maxAchat=max;
}

_money:any;
  @Input()
  set money(value: number){
    this._money=value
  }




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
    this.product.lastupdate = Date.now()
    this.product.timeleft = this.product.vitesse
  }

  ngOnInit() {
    setInterval(() => { this.calcScore(); }, 100);
    this.unlockManagerCheck(this.product)
  }

  unlockManagerCheck(p: Product) {
    let manager = this.world.managers.find(m => m.idcible === this.product.id);
    if (manager.unlocked == true) {
      this.auto = true
    }
  }


  calcScore() {
    if (this.product.timeleft > 0) {
      let elapsetime = Date.now() - this.product.lastupdate;
      this.product.lastupdate = Date.now()
      this.product.timeleft -= elapsetime
      console.log(this.product.timeleft)
      if (this.product.timeleft <= 0) {
        this.product.timeleft = 0;
        this.run = false
        console.log("fin de prod")
        // on prévient le composant parent que ce produit a généré son revenu.
        this.notifyProduction.emit(this.product);
        if (this.auto == true) {
          this.startFabrication()
          console.log("manager au boulot")
        }
      }
    }
    else {

    }
  }


  @Output()
  notifyProduction: EventEmitter<Product> = new
    EventEmitter<Product>();
}
