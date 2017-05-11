import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';

import { Cliente } from '../../models/user'
import { Solicitud } from '../../models/solicitud'

import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';
import {BusquedaPage} from '../busqueda/busqueda';

import { SolicitudesService } from '../../providers/solicitudes-service';
import { UserDataService } from '../../providers/user-data-service';

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
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public userDataService: UserDataService,
              public solicitudesService: SolicitudesService) {
    this.pages = [
      { title: 'Lista de Solicitudes', component: ClientePage, icon: 'folder-opne' },
      { title: 'Configuración', component: LoginPage, icon: 'settings' },
      { title: 'Cerrar Sesión', component: null, icon: 'power' },
    ];
  }

  ngOnInit()
  {
    this.cliente = this.userDataService.getCliente();
    this.solicitudesService.obtenerSolicitudesCliente().subscribe(
      (solicitudes) => {
        this.solicitudes = solicitudes;
        this.solicitudes.reverse();
      },
      (error) => {

      }
    )
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
    else {
      this.navCtrl.push(page.component);
    }
  }

}
