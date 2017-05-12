import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Events, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import {RegisterPage} from '../register/register';
import {TrabajadorPage} from '../trabajador/trabajador';
import {ClientePage} from '../cliente/cliente';

import { UserDataService } from '../../providers/user-data-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
	password: string;
  loader: Loading;

  constructor(public navCtrl: NavController,
              private authService: AuthService,
              public alertCtrl: AlertController,
              public events: Events,
              public userDataService: UserDataService,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

  }

  iniciarSesion(){
    if( !this.username || !this.password )
    {
      this.showError();
    }
    else
    {
      this.presentLoader();
      this.userDataService.getTipo( this.username, this.password ).subscribe(
        data =>{
          if( data.tipo == "ninguno" )
          this.showError();
          else if( data.tipo == "trabajador" )
          this.iniciarSesionTrabajador();
          else
          this.iniciarSesionCliente();
        }
      )
    }
  }

  iniciarSesionTrabajador() {
		this.authService.login(this.username, this.password).subscribe(
			token => {
				localStorage.setItem('token', token.token);
				this.authService.reloadToken();
				this.getAuthenticatedTrabajador();
			},
			err => {

			})
  }

  iniciarSesionCliente() {
    this.authService.login(this.username, this.password).subscribe(
      token => {
        localStorage.setItem('token', token.token);
        this.authService.reloadToken();
        this.getAuthenticatedCliente();
      },
      err => {

      })
  }


  getAuthenticatedTrabajador() {
    this.authService.getAuthTrabajador().subscribe(
      trabajador => {
        this.userDataService.setTrabajador(trabajador);
        this.navCtrl.setRoot(TrabajadorPage);
        this.dismissLoader();
    },
    error => {
    }
    );
  }

  getAuthenticatedCliente() {
    this.authService.getAuthCliente().subscribe(
      cliente => {
        this.userDataService.setCliente(cliente);
        this.navCtrl.setRoot(ClientePage);
        this.dismissLoader();
      },
      error => {
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

  showError(){
    let msg = "Los datos ingresados no son correctas!";
    var alert = this.alertCtrl.create({
      title: 'Error al iniciar sesión',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
    this.dismissLoader();
  }

}
