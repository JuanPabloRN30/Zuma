import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import {Solicitud} from '../../models/solicitud';
import {Trabajador} from '../../models/user';

import {ClientePage} from '../cliente/cliente'

import { SolicitudesService } from '../../providers/solicitudes-service';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  solicitud: Solicitud;
  trabajadores: Trabajador[];
  interes: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public solicitudesService: SolicitudesService) {
    this.solicitud = navParams.get('solicitud');
    console.log( this.solicitud );
    this.interes = this.solicitud.interes.nombre;
  }

  ngOnInit()
  {
    this.solicitudesService.obtenerTrabajadoresInteres( this.solicitud.interes.nombre ).subscribe(
      (trabajadores) => {
        this.trabajadores = trabajadores;
        this.trabajadores.reverse();
        if( this.trabajadores.length == 0 )
        {
          var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'No hay trabajadores registrados con este interes',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();
        }
        console.log( this.trabajadores );
      },
      (error) => {

      }
    )
  }

  solicitar( trabajador : Trabajador ){
    this.solicitud.trabajador = trabajador;
    this.solicitudesService.createSolicitud(this.solicitud).subscribe(
      solicitud => {
        console.log( solicitud )
        this.navCtrl.setRoot( ClientePage );
      },
      (error: Response) => {
        console.log(error);
        var msg = 'No se pudo crear la solicitud'
        var alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: msg,
          buttons: ['OK']
        });
        alert.present();
      })
  }

}
