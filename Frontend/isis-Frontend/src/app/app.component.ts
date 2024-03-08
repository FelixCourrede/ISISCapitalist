import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebserviceService } from './webservice.service';
import { World } from './world';
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
    service.getWorld().then(
      world => {
        this.world = world.data.getWorld;
      }
    );
  }

  
}
