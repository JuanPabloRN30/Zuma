import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx'
import { Observable } from "rxjs/Observable";

import { Trabajador } from '../models/user';
import {Cliente} from '../models/user';

import { SERVER_URL } from './services-util'

@Injectable()
export class UserDataService {

  trabajador: Trabajador;
  cliente: Cliente;

  constructor(public http: Http) {
    console.log('Hello UserDataService Provider');
  }

  getTrabajador(): Trabajador {
    return this.trabajador;
  }

  setTrabajador(trabajador: Trabajador): void {
    this.trabajador = trabajador;
  }

  getCliente(): Cliente {
    return this.cliente;
  }

  setCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }

  saveTrabajador(trabajador: Trabajador): Observable<Trabajador> {
   let createTrabajadorURI: string = `${SERVER_URL}/api/trabajador/`
   var headers = new Headers({ 'Content-Type': 'application/json',
                                'Accept': 'application/json',
   })
   var options = new RequestOptions({ headers: headers });
   return this.http.post(createTrabajadorURI, trabajador.export(), options)
              .map(response => response.json() as Trabajador)
              .catch(this.handleError)
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
   let createClienteURI: string = `${SERVER_URL}/api/cliente/`
   var headers = new Headers({ 'Content-Type': 'application/json',
                                'Accept': 'application/json',
   })
   var options = new RequestOptions({ headers: headers });
   return this.http.post(createClienteURI, cliente.export(), options)
              .map(response => response.json() as Cliente)
              .catch(this.handleError)
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

}
