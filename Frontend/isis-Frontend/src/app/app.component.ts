import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebserviceService } from './webservice.service';
import { Palier, World } from './world';
import { Product } from './world';
import { ProductComponent } from './product/product.component';
import { BigvaluePipe } from './bigvalue.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, BigvaluePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'isis-Frontend';

  server = '';

  world = new World();
  constructor(private service: WebserviceService) {
    this.server = service.server
    console.log("constructeur")
    service.getWorld().then(
      world => {
        console.log("ok request")
        this.world = world.data.getWorld || new World();
      }
    );
  }

  onProductionDone(p: Product) {
    this.world.score += p.cout
    p.cout = p.cout + p.cout * p.croissance
  }

  hireManager(manager: Palier) {
    this.world.money = this.world.money - manager.seuil
    manager.unlocked = true
    let produit = this.world.products.find(p => p.id === manager.idcible)
    if (produit)
      produit.managerUnlocked = true
  }


}