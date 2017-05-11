import { Component } from '@angular/core';
import { NavController,LoadingController, Loading } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import {TrabajadorPage} from '../trabajador/trabajador';
import {ClientePage} from '../cliente/cliente';

import { AuthService } from '../../providers/auth-service';
import { UserDataService } from '../../providers/user-data-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loader: Loading;

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public userDataService: UserDataService,
              public loadingCtrl: LoadingController,
             ) {
  }

  ionViewDidLoad(){
    if(localStorage.getItem('token')) {
      this.presentLoader();
			this.getAuthenticatedTrabajador();
      this.getAuthenticatedCliente();
      this.dismissLoader();
		}
  }

  getAuthenticatedTrabajador() {
    this.authService.getAuthTrabajador().subscribe(
      trabajador => {
        console.log(trabajador);
        this.userDataService.setTrabajador(trabajador);
        console.log(trabajador);
        this.navCtrl.setRoot(TrabajadorPage);
    },
    error => {
        console.log('Error en trabajador');
    }
    );
  }

  getAuthenticatedCliente() {
    this.authService.getAuthCliente().subscribe(
      cliente => {
        console.log(cliente);
        this.userDataService.setCliente(cliente);
        console.log(cliente);
        this.navCtrl.setRoot(ClientePage,{
          cliente: cliente
        });
      },
      error => {
          console.log('Error en cliente');
      }
    );
  }

  ingresar(){
    this.navCtrl.push( LoginPage );
  }

  registrar(){
    this.navCtrl.push( RegisterPage );
  }

  presentLoader() {
		this.loader = this.loadingCtrl.create({spinner: 'crescent'});
    this.loader.present();
  }

  dismissLoader() {
		if(this.loader) {
			this.loader.dismiss();
		}
  }

}
