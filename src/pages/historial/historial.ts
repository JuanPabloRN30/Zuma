import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Solicitud } from '../../models/solicitud'
import { Categoria } from '../../models/categoria'
import { Trabajador } from '../../models/user'

import { areas_interes } from '../../providers/services-util';

import { SolicitudesService } from '../../providers/solicitudes-service';
import { UserDataService } from '../../providers/user-data-service';

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  trabajador: Trabajador;
  solicitudes: Solicitud[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public solicitudesService: SolicitudesService,
              public userDataService: UserDataService) {
  }

  ngOnInit()
  {
    this.trabajador = this.userDataService.getTrabajador();
    this.loadData();
  }

  loadData(){
    this.solicitudesService.obtenerSolicitudesTrabajador("").subscribe(
      (solicitudes) => {
        this.solicitudes = solicitudes;
        this.solicitudes.reverse();
        for( var i = 0 ; i < this.solicitudes.length; i++ )
        {
          var nombre_interes = this.solicitudes[ i ].interes.nombre;
          this.solicitudes[ i ].interes.categoria = new Categoria( {nombre: this.obtenerCategoria( nombre_interes )} )
        }

      },
      (error) => {

      }
    )
  }

  obtenerCategoria( nombre: string ){
    for (var i = 0; i < areas_interes['Hogar'].length ; i++)
      if( areas_interes['Hogar'][ i ] == nombre )
        return 'Hogar';
    for (var i = 0; i < areas_interes['Alimentacion'].length ; i++)
      if( areas_interes['Alimentacion'][ i ] == nombre )
        return 'Alimentacion'
    for (var i = 0; i < areas_interes['Belleza'].length ; i++)
      if( areas_interes['Belleza'][ i ] == nombre )
        return 'Belleza'
  }

  aceptarSolicitud(solicitud: Solicitud){
    solicitud.estado = "Aceptada";
    this.solicitudesService.editSolicitud( solicitud ).subscribe(
      solicitud => {
        this.loadData();
      },
      (error: Response) => {
        console.log(error);
        var msg = 'No se pudo editar la solicitud'
        var alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: msg,
          buttons: ['OK']
        });
        alert.present();
      })
  }

  rechazarSolicitud(solicitud: Solicitud){
    solicitud.estado = "Rechazada";
    this.solicitudesService.editSolicitud( solicitud ).subscribe(
      solicitud => {
        this.loadData();
      },
      (error: Response) => {
        console.log(error);
        var msg = 'No se pudo editar la solicitud'
        var alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: msg,
          buttons: ['OK']
        });
        alert.present();
      })
  }
}
