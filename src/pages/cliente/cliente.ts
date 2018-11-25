import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AlertController,Platform } from 'ionic-angular';

import { Cliente } from '../../models/user'
import { Solicitud } from '../../models/solicitud'
import { Categoria } from '../../models/categoria'


import { Interes } from '../../models/interes'

import {HomePage} from '../home/home';
import {BusquedaPage} from '../busqueda/busqueda';
import {HistorialPage} from '../historial/historial';

//Borrar
import {ResultsPage} from '../results/results';

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


  categorias: string[] = ['Hogar','Alimentacion','Belleza'];
  categoria: Categoria;
  interes: Interes;
  solicitud: Solicitud;
  areas_interes: any = areas_interes;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public userDataService: UserDataService,
              public solicitudesService: SolicitudesService,
              public platform: Platform
            ) {
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
    this.platform.registerBackButtonAction( () => {
      this.interes = new Interes({});
      this.categoria = new Categoria({});
      this.solicitud = new Solicitud({});
      this.categoria.nombre = "";
    });
  }

  loadData(){
    this.interes = new Interes({});
    this.categoria = new Categoria({});
    this.solicitud = new Solicitud({});
    this.categoria.nombre = "";
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
    else if(page.title == 'Lista de Solicitudes') {
        // this.navCtrl.setRoot(page.component);
        this.loadData();
    }
    else if( page.title == 'Historial de Solicitudes' )
      this.navCtrl.push(page.component, {
        usuario: 'Cliente'
      });
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

  // BORRAR
  irInteres( categoria: string ){
    this.categoria.nombre = categoria;
  }

  irTrabajadores( interes: string ){
      var alert = this.alertCtrl.create({
        title: 'Ingresar fecha',
        inputs:[
          {
            name:'fecha',
            placeholder: 'fecha',
            type: 'datetime-local'
          }
        ],
        buttons: [
          {
            text:'OK',
            handler: data =>{
              this.interes.nombre = interes;
              this.interes.categoria = this.categoria;
              this.solicitud.interes = this.interes;
              if( data.fecha == "" )
                this.showError();
              else
              {
                this.solicitud.fecha = new Date( data.fecha );
                this.solicitud.estado = "Pendiente";
                console.log( this.solicitud );
                this.navCtrl.push(ResultsPage,{
                  solicitud: this.solicitud
                });
              }
            }
          }
        ]
      });
      alert.present();
  }

  showError(){
    let msg = "La fecha no se ha ingresado!";
    var alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
