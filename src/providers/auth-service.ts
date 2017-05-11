import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { Trabajador } from '../models/user';
import { Cliente } from '../models/user';
import { Observable } from "rxjs/Observable";
import { SERVER_URL } from './services-util';

@Injectable()
export class AuthService {
  token: string;


  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
    this.token = localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<any>{
    let loginUrl: string = `${SERVER_URL}/api/token-auth/`;
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
    var options = new RequestOptions({ headers: headers });
    return this.http.post(loginUrl,{
        username: username,
        password: password
      }, options)
    .map(response => response.json())
    .catch(this.handleError)

  }

  getAuthTrabajador(): Observable<Trabajador> {
    let authTrabajadorUrl: string = `${SERVER_URL}/api/trabajador/authenticated/`;
    console.log( 'Este token: ' + this.token )
    var headers = new Headers({ 'Content-Type': 'application/json',
                             'Accept': 'application/json',
                             'Authorization': `Token ${this.token}`
                           });
    var options = new RequestOptions({ headers: headers });
    return this.http.get(authTrabajadorUrl, options)
                   .map(response => { console.log(response); return new Trabajador(response.json())})
                   .catch(this.handleError)
   }

   getAuthCliente(): Observable<Cliente> {
     let authClienteUrl: string = `${SERVER_URL}/api/cliente/authenticated/`;
     var headers = new Headers({ 'Content-Type': 'application/json',
                              'Accept': 'application/json',
                              'Authorization': `Token ${this.token}`
                            });
     var options = new RequestOptions({ headers: headers });
     return this.http.get(authClienteUrl, options)
                    .map(response => { console.log(response); return new Cliente(response.json())})
                    .catch(this.handleError)
    }

   reloadToken() {
    this.token = localStorage.getItem('token');
    console.log('token updated: ' + this.token);
   }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

}
