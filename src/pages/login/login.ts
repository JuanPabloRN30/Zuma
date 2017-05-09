import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Events, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import {RegisterPage} from '../register/register';
import {TrabajadorPage} from '../trabajador/trabajador';

import { SERVER_URL } from '../../providers/services-util';
import { UserDataService } from '../../providers/user-data-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
	password: string;
	authenticatingUser: boolean;
  loader: Loading;

  constructor(public navCtrl: NavController,
              private authService: AuthService,
              public alertCtrl: AlertController,
              public events: Events,
              public userDataService: UserDataService,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
		if(localStorage.getItem('token')) {
      console.log('Entre aca');
      console.log(localStorage.getItem('token'));
			this.authenticatingUser = true;
			this.getAuthenticatedCustomer();
		} else {
			this.authenticatingUser = false;
		}
  }

  iniciarSesion() {
		this.presentLoader();
		this.authService.login(this.username, this.password).subscribe(
			token => {
				console.log(token.token);
				localStorage.setItem('token', token.token);
				this.authService.reloadToken();
				this.getAuthenticatedCustomer();
			},
			err => {
				this.authenticatingUser = false;
				let msg = "error " + SERVER_URL;
				if (err.status == 500) {
						msg = "error de conexión, porfavor intenta mas tarde";
				} else if (err.status == 400) {
						msg = "Las credenciales ingresadas no son correctas!";
				}
				var alert = this.alertCtrl.create({
						title: 'Error al iniciar sesión',
						subTitle: msg,
						buttons: ['OK']
				});
				this.dismissLoader();
				alert.present();
			})
  }

  getAuthenticatedCustomer() {
    this.authService.getAuthTrabajador().subscribe(
      trabajador => {
        this.events.publish('trabajador:logged', trabajador);
        console.log(trabajador);
        this.userDataService.setTrabajador(trabajador);
        console.log(trabajador);
        this.navCtrl.setRoot(TrabajadorPage);
        this.dismissLoader();
    },
    error => {
        this.authenticatingUser = false;
        this.dismissLoader();
    }
    );

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

  registrar(){
    this.navCtrl.push( RegisterPage );
  }

}
