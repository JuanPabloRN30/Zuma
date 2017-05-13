import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Cliente } from '../../models/user'
import { Solicitud } from '../../models/solicitud'
import { Categoria } from '../../models/categoria'

import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';
import {BusquedaPage} from '../busqueda/busqueda';
import {HistorialPage} from '../historial/historial';

import { SolicitudesService } from '../../providers/solicitudes-service';
import { UserDataService } from '../../providers/user-data-service';

import { areas_interes } from '../../providers/services-util';

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  pages: Array<{title: string, component: any, icon: string}>;
  cliente: Cliente;
  solicitudes: Solicitud[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public userDataService: UserDataService,
              public solicitudesService: SolicitudesService) {
    this.pages = [
      { title: 'Lista de Solicitudes', component: ClientePage, icon: 'folder-open' },
      { title: 'Historial de Solicitudes', component: HistorialPage, icon: 'folder-open' },
      { title: 'Cerrar Sesión', component: null, icon: 'power' },
    ];
    menuCtrl.enable(true);
  }

  ngOnInit()
  {
    this.cliente = this.userDataService.getCliente();
    this.loadData();
  }

  loadData(){
    this.solicitudesService.obtenerSolicitudesCliente("Pendiente,Aceptada").subscribe(
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

  buscar(){
    this.navCtrl.push( BusquedaPage );
  }

  openPage(page) {
    if(page.title == 'Cerrar Sesión') {
      let loader = this.loadingCtrl.create({spinner: 'crescent'});
      loader.present();
      localStorage.removeItem('token');
      this.navCtrl.setRoot(HomePage);
      loader.dismiss();
    }
    else if(page.title == 'Configuraciones') {
        this.navCtrl.setRoot(page.component);
    }
    else if( page.title == 'Historial de Solicitudes' )
      this.navCtrl.push(page.component, {
        usuario: 'Cliente'
      });
    else
      this.navCtrl.push(page.component);
  }

  finalizarSolicitud(solicitud: Solicitud){
    solicitud.estado = "Finalizada";
    this.solicitudesService.editSolicitud( solicitud ).subscribe(
      solicitud => {
        this.loadData();
      },
      (error: Response) => {
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
