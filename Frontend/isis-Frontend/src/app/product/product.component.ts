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

  //appel produit
  product: Product = new Product()
  @Input()
  set prod(value: Product) {
    this.product = value;
    if (!this.product) { this.product = new Product() }
  }

  progressbarvalue = 0
  maxAchat = 0
  coutTotal = 0

  //Gestion du commutateur
  _commutateur: any;
  @Input()
  set commutateur(value: any) {
    this._commutateur = value
    if (this._commutateur && this.product) this.calcMaxCanBuy();

  }

  getMaxAchat() {
    return this.maxAchat
  }

  calcMaxCanBuy() {
    let max = (this.product.croissance ** this.product.quantite) * this.product.cout;
    this.maxAchat = max;
  }

  //calcul de l'argent en possession
  _money: any;
  @Input()
  set money(value: number) {
    this._money = value
  }

  //prep de l'augmentation du score
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

  //démarrage fabrication au début
  startFabrication() {
    this.run = true
    this.product.lastupdate = Date.now()
    if (this._commutateur == 'Max') {
      this.product.timeleft = this.product.vitesse * this.maxAchat
      let coutTotal = this.product.cout * this.maxAchat
    }
    else {
      this.product.timeleft = this.product.vitesse * this._commutateur
      let coutTotal = this.product.cout * this.commutateur
    }

    this.notifyCost.emit(this.maxAchat)
  }

  //initialisation de la classe
  ngOnInit() {
    setInterval(() => { this.calcScore(); }, 100);
  }



  //calcul du score
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
        if (this.product.managerUnlocked) {
          this.startFabrication()
        }
      }
    }
    else {

    }
  }

  //envoyer la notification de production à app.component
  @Output()
  notifyProduction: EventEmitter<Product> = new
    EventEmitter<Product>();

  @Output()
  notifyCost: EventEmitter<number> = new EventEmitter<number>()
}