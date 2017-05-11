import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { Solicitud } from '../models/solicitud';

import { Observable } from "rxjs/Observable";
import { SERVER_URL } from './services-util';

@Injectable()
export class SolicitudesService {

  token: string;

  constructor(public http: Http) {
    this.token = localStorage.getItem('token');
  }

  /*getRemoteData()
  {
    this.http.get('api/categoria/Hogar/').map(
      res => res.json()
    ).subscribe(
      data =>{
        console.log(data);
        console.log(data.nombre);
        console.log(data.intereses[0]);
        console.log(data.code);
        console.log(data.linenos);
        console.log(data.language);
        console.log(data.style);
      }
    );
  }*/

  obtenerSolicitudesCliente()
  {
    let solicitudesClienteUrl: string = `${SERVER_URL}/api/cliente/solicitud/`;
    var headers = new Headers({ 'Content-Type': 'application/json',
                             'Accept': 'application/json',
                             'Authorization': `Token ${this.token}`
                           });
    var options = new RequestOptions({ headers: headers });
    return this.http.get(solicitudesClienteUrl, options)
                    .map(response => { console.log(response); return new Solicitud(response.json())})
                    .catch(this.handleError)
  }

  getRemoteData()
  {
    return this.http.get('api/categoria/Hogar/').map(
      res => res.json()
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

}
