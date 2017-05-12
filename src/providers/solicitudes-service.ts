import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { Solicitud } from '../models/solicitud';
import { Trabajador } from '../models/user';

import { Observable } from "rxjs/Observable";
import { SERVER_URL } from './services-util';

@Injectable()
export class SolicitudesService {

  token: string;

  constructor(public http: Http) {
    this.token = localStorage.getItem('token');
  }

  createSolicitud(solicitud: Solicitud): Observable<any> {
   let createSolicitudUrl: string = `${SERVER_URL}/api/solicitud/`;
    var headers = new Headers({ 'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': `Token ${this.token}`
                            });
    var body = JSON.stringify(solicitud.export());
    var options = new RequestOptions({ headers: headers });
    return this.http.post(createSolicitudUrl, body, options)
                    .map(response => new Solicitud(response.json()))
                    .catch(this.handleError)
  }

  editSolicitud(solicitud: Solicitud): Observable<any> {
   let aceptarSolicitudUrl: string = `${SERVER_URL}/api/solicitud/edit/`;
    var headers = new Headers({ 'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': `Token ${this.token}`
                            });
    var body = JSON.stringify(solicitud.export());
    var options = new RequestOptions({ headers: headers });
    return this.http.post(aceptarSolicitudUrl, body, options)
                    .map(response => new Solicitud(response.json()))
                    .catch(this.handleError)
  }

  obtenerSolicitudesCliente(estado: string): Observable<Solicitud[]>
  {
    let solicitudesClienteUrl: string = `${SERVER_URL}/api/cliente/solicitud/`;
    if( estado != "" )
        solicitudesClienteUrl+= '?estado='+estado;
    var headers = new Headers({ 'Content-Type': 'application/json',
                             'Accept': 'application/json',
                             'Authorization': `Token ${this.token}`
                           });
    var options = new RequestOptions({ headers: headers });
    return this.http.get(solicitudesClienteUrl, options)
                    .map(response => this.extractSolicitudes( response.json() ))
                    .catch(this.handleError)
  }

  obtenerSolicitudesTrabajador(estado: string): Observable<Solicitud[]>
  {
    let solicitudesTrabajadorUrl: string = `${SERVER_URL}/api/trabajador/solicitud/`;
    if( estado != "" )
        solicitudesTrabajadorUrl+= '?estado='+estado;
    var headers = new Headers({ 'Content-Type': 'application/json',
                             'Accept': 'application/json',
                             'Authorization': `Token ${this.token}`
                           });
    var options = new RequestOptions({ headers: headers });
    return this.http.get(solicitudesTrabajadorUrl, options)
                    .map(response => this.extractSolicitudes( response.json() ))
                    .catch(this.handleError)
  }

  private extractSolicitudes(rawWorks: any): Observable<Solicitud[]> {
    return rawWorks.map(rawWork => {
      console.log(rawWork);
      return new Solicitud(rawWork);
    })
  }

  obtenerTrabajadoresInteres( interes: string ): Observable<Trabajador[]>
  {
    let obtenerTrabajadorUrl: string = `${SERVER_URL}/api/trabajador/interes/${interes}/`;
    var headers = new Headers({ 'Content-Type': 'application/json',
                             'Accept': 'application/json',
                             'Authorization': `Token ${this.token}`
                           });
    var options = new RequestOptions({ headers: headers });
    return this.http.get(obtenerTrabajadorUrl, options)
                    .map(response => this.extractTrabajadores( response.json() ))
                    .catch(this.handleError)
  }

  private extractTrabajadores(rawWorks: any): Observable<Trabajador[]> {
    return rawWorks.map(rawWork => {
      console.log(rawWork);
      return new Trabajador(rawWork);
    })
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
