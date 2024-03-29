import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebserviceService } from './webservice.service';
import { Palier, World } from './world';
import { Product } from './world';
import { ProductComponent } from './product/product.component';
import { BigvaluePipe } from './bigvalue.pipe';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export function commuter(valeur: any) {
  var k = new Array<any>();
  k.push(1, 10, 100, 'Max');
  for (let i = 0; i < k.length; i++) {
    if (k[i] == valeur) {
      valeur = k[i + 1];
      return valeur;
    }
  }
  return valeur;
}

//Composant
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductComponent,
    BigvaluePipe,
    NgIf,
    NgFor,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

//export de la classe
export class AppComponent {
  title = 'isis-Frontend';
  server = '';
  username = "user";

  //gestion du commutateur
  valeurCommutateur = [1, 10, 100, 'Max']
  commutateur: any = 1;

  commutateurSwitch() {
    for (let k = 0; k < 3; k++) {
      if (this.commutateur == this.valeurCommutateur[k]) {
        this.commutateur = this.valeurCommutateur[k + 1]
        console.log(this.commutateur)
        return (this.commutateur)
      }
    }
    this.commutateur = 1;
    console.log(this.commutateur)
    return (this.commutateur)
  }

  //gestion du monde
  world = new World();
  constructor(private service: WebserviceService) {
    this.server = service.server;
    console.log('constructeur');
    service.getWorld().then((world) => {
      console.log('ok request');
      this.world = world.data.getWorld || new World();
    });
  }



  //prévient de la production d'un produit et ajoute le coût au score
  onProductionDone(p: Product) {
      this.world.score += p.quantite*p.revenu;
      this.world.money += p.quantite*p.revenu;
  }

  //engagement de managers
  hireManager(manager: Palier) {
    this.world.money = this.world.money - manager.seuil;
    manager.unlocked = true;
    let produit = this.world.products.find((p) => p.id === manager.idcible);
    if (produit) produit.managerUnlocked = true;
  }

  //pour montrer ou non les managers, upgrades et patrons dans le html
  showManagers = false
  showUpgrades = false
  showAngels = false

  showManagersOnClick() {
    this.showManagers = !this.showManagers;
  }
/*
  onUsernameChanged() {
    this.username = localStorage.getItem("username");
    localStorage.setItem("username", this.username);
  }
  */






}
