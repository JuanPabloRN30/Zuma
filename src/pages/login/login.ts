import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';
import {TrabajadorPage} from '../trabajador/trabajador';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  iniciarSesion(){
    console.log('El usuario es: ' + this.username);
    console.log('El password es: ' + this.password);
    this.navCtrl.setRoot(TrabajadorPage);
  }

  registrar(){
    this.navCtrl.push( RegisterPage );
  }

}
