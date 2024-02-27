import { Injectable } from '@angular/core';
import { Client, fetchExchange } from '@urql/core';
import { GET_WORLD } from './Graphrequests';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  //server = 'http://localhost.4000/';
  server = 'https://isiscapitalistgraphql.kk.kurasawa.fr/graphql';
  user = '';

  constructor() { }

  createClient() {
    return new Client({
      url: this.server,
      exchanges: [fetchExchange],
      fetchOptions: () => {
        return {
          headers: { 'x-user': this.user },
        };
      },
    });
  }

  getWorld() {
    return this.createClient().query(GET_WORLD, {}).toPromise();
  }
}
