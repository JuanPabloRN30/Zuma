import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';

import { Cliente } from '../../models/user'

import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';

import { SolicitudesService } from '../../providers/solicitudes-service';

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  pages: Array<{title: string, component: any, icon: string}>;
  cliente: Cliente;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public solicitudesService: SolicitudesService) {
    this.pages = [
      { title: 'Lista de Solicitudes', component: ClientePage, icon: 'folder-opne' },
      { title: 'Configuración', component: LoginPage, icon: 'settings' },
      { title: 'Cerrar Sesión', component: null, icon: 'power' },
    ];
    if( navParams.get('cliente') )
    {
      console.log("Hay un cliente")
      console.log( navParams.get('cliente') )
      this.cliente = navParams.get('cliente');
      console.log(this.solicitudesService.obtenerSolicitudesCliente(  ))
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Cliente');
    this.solicitudesService.getRemoteData().subscribe(
      data => {
        console.log("Entre")
        console.log(data)
      }
    );
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  buscarHogar(){

  }

  buscarAlimentacion(){

  }

  buscarBelleza(){

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
    else {
      this.navCtrl.push(page.component);
    }
  }

}
