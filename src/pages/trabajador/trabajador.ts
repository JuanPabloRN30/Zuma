import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Solicitud } from '../../models/solicitud'
import { Trabajador } from '../../models/user'
import { Categoria } from '../../models/categoria'

import {HomePage} from '../home/home';
import {HistorialPage} from '../historial/historial';

import { areas_interes } from '../../providers/services-util';

import { SolicitudesService } from '../../providers/solicitudes-service';
import { UserDataService } from '../../providers/user-data-service';

@IonicPage()
@Component({
  selector: 'page-trabajador',
  templateUrl: 'trabajador.html',
})
export class TrabajadorPage {

  trabajador: Trabajador;
  solicitudes: Solicitud[];
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public solicitudesService: SolicitudesService,
              public userDataService: UserDataService
              ) {

      this.pages = [
        { title: 'Lista de Solicitudes', component: TrabajadorPage, icon: 'folder-open' },
        { title: 'Historial de Solicitudes', component: HistorialPage, icon: 'folder-open' },
        { title: 'Cerrar Sesión', component: null, icon: 'power' },
      ];
      menuCtrl.enable(true);
  }

  ionViewDidLoad(){

  }

  ngOnInit()
  {
    this.trabajador = this.userDataService.getTrabajador();
    this.loadData();
  }

  loadData(){
    this.solicitudesService.obtenerSolicitudesTrabajador("Pendiente,Aceptada").subscribe(
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

  openPage(page) {
    if(page.title == 'Cerrar Sesión') {
      let loader = this.loadingCtrl.create({spinner: 'crescent'});
      loader.present();
      localStorage.removeItem('token');
      this.navCtrl.setRoot(HomePage);
      loader.dismiss();
    }
    else if( page.title == 'Lista de Solicitudes' )
      this.loadData();
    else if( page.title == 'Historial de Solicitudes' )
      this.navCtrl.push(page.component, {
        usuario: 'Trabajador'
      });
    else
      this.navCtrl.push(page.component);
  }

}
