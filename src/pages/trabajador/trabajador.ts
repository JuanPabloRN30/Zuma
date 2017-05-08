import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import {LoginPage} from '../login/login';

@IonicPage()
@Component({
  selector: 'page-trabajador',
  templateUrl: 'trabajador.html',
})
export class TrabajadorPage {

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menuCtrl: MenuController

              ) {

      this.pages = [
        { title: 'Lista de Solicitudes', component: LoginPage, icon: 'home' },
        { title: 'Configuración', component: LoginPage, icon: 'home' },
        { title: 'Cerrar Sesión', component: LoginPage, icon: 'home' },
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

  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }

}
