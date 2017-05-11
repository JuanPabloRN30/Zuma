import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';

import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';

@IonicPage()
@Component({
  selector: 'page-trabajador',
  templateUrl: 'trabajador.html',
})
export class TrabajadorPage {

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController
              ) {

      this.pages = [
        { title: 'Lista de Solicitudes', component: TrabajadorPage, icon: 'folder-open' },
        { title: 'Configuración', component: LoginPage, icon: 'settings' },
        { title: 'Cerrar Sesión', component: null, icon: 'power' },
      ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Trabajador');
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

  /*openPage(page) {
    this.navCtrl.setRoot(page.component);
  }*/


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
