import { Injectable } from '@angular/core';

import { GET_WORLD } from './Graphrequests';
import { World } from './world';
import { Client, fetchExchange } from "@urql/core"

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  server = 'http://localhost:4000/';
  //server = 'https://isiscapitalistgraphql.kk.kurasawa.fr/';
  user = '';

  constructor() { }

  createClient() {
    return new Client({
      url: this.server+'graphql',
      exchanges: [fetchExchange],
      fetchOptions: () => {
        return {
          headers: { 'x-user': this.user },
        };
      },
    });
  }

  getWorld()  {
    console.log("get world")
    return this.createClient().query(GET_WORLD, {}).toPromise();
  }
}
