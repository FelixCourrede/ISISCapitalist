import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebserviceService } from './webservice.service';
import { World } from './world';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'isis-Frontend';

  world = new World();
  constructor(private service: WebserviceService) {
    service.getWorld().then(
      world => {
        this.world = world.data.getWorld;
      }
    );
  }
}
