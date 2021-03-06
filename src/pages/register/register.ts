import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, Events, NavParams } from 'ionic-angular'
import { AlertController, ModalController } from 'ionic-angular'

import { Trabajador } from '../../models/user'
import { Cliente } from '../../models/user'
import { Interes } from '../../models/interes'
import { User } from '../../models/user'

import {TrabajadorPage} from '../trabajador/trabajador'
import {ClientePage} from '../cliente/cliente'

import { UserDataService } from '../../providers/user-data-service'
import { AuthService } from '../../providers/auth-service';

import { areas_interes } from '../../providers/services-util';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  trabajador: Trabajador;
  cliente: Cliente;
  usuario: User;

  tipo: string;
  intereses_h: string[];
  intereses_a: string[];
  intereses_b: string[];
  interes: Interes[] = [];
  areas_interes: any = areas_interes;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserDataService,
              public alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private authService: AuthService,
              public events: Events,
              public userDataService: UserDataService) {
      this.usuario = new User({});
  }

  registrar() {
    this.usuario.username = this.usuario.email;
    this.crearIntereses();
    if( this.tipo == "trabajador" )
    {
      this.trabajador = new Trabajador(this.usuario);
      this.registrarTrabajador( );
    }
    else if( this.tipo == "cliente" )
    {
      this.cliente = new Cliente( this.usuario );
      this.registrarCliente( );
    }
    else
    {
      var alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'No selecciono ningún tipo de usuario',
        buttons: ['OK']
      });
      alert.present();
    }

  }

  crearIntereses()
  {

    if( this.intereses_h )
    {
        for( let current of this.intereses_h )
        {
          var aux = new Interes({});
          aux.nombre = current;
          this.interes.push( aux );
        }
    }
    if( this.intereses_a )
    {
        for( let current of this.intereses_a )
        {
          var aux = new Interes({});
          aux.nombre = current;
          this.interes.push( aux );
        }
    }
    if( this.intereses_b )
    {
        for( let current of this.intereses_b )
        {
          var aux = new Interes({});
          aux.nombre = current;
          this.interes.push( aux );
        }
    }
    this.usuario.intereses = this.interes;
  }

  registrarTrabajador( )
  {
    this.userService.saveTrabajador(this.trabajador).subscribe(
      trabajador => {
        this.authService.login(this.trabajador.username, this.trabajador.password).subscribe(
          token => {
            localStorage.setItem('token', token.token);
            this.authService.reloadToken();
            this.getAuthenticatedTrabajador();
          },
          error => {
            console.log(error);
          });
      },
      (error: Response) => {
        console.log(error);
        var msg = 'No se pudo crear el usuario'
        if(error.status == 500){
          msg = "El correo seleccionado ya está en uso";
        } else if (error.status == 400) {
          let errObj = error.json();
          if (errObj['email']) {
            msg = errObj['email'];
          } else if (errObj['username']) {
            msg = errObj['username'];
          }  else {
            msg = "Error por favor intenta más tarde";
          }
        }

        var alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: msg,
          buttons: ['OK']
        });
        alert.present();
      })
  }

  registrarCliente( )
  {
    this.userService.saveCliente(this.cliente).subscribe(
      cliente => {
        this.authService.login(this.cliente.username, this.cliente.password).subscribe(
          token => {
            localStorage.setItem('token', token.token);
            this.authService.reloadToken();
            this.getAuthenticatedCliente();
          },
          error => {
            console.log(error);
          });
      },
      (error: Response) => {
        console.log(error);
        var msg = 'No se pudo crear el usuario'
        if(error.status == 500){
          msg = "El correo seleccionado ya está en uso";
        } else if (error.status == 400) {
          let errObj = error.json();
          if (errObj['email']) {
            msg = errObj['email'];
          } else if (errObj['username']) {
            msg = errObj['username'];
          }  else {
            msg = "Error por favor intenta más tarde";
          }
        }

        var alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: msg,
          buttons: ['OK']
        });
        alert.present();
      })
  }

  getAuthenticatedTrabajador() {
		this.authService.getAuthTrabajador().subscribe(
			trabajador => {
				this.events.publish('trabajador:logged', trabajador);
				this.userDataService.setTrabajador(trabajador);
				this.navCtrl.setRoot(TrabajadorPage);
			},
			error => {

			}
		);
	}

  getAuthenticatedCliente() {
		this.authService.getAuthCliente().subscribe(
			cliente => {
				this.events.publish('cliente:logged', cliente);
				this.userDataService.setCliente(cliente);
				this.navCtrl.setRoot(ClientePage);
			},
			error => {

			}
		);
	}


}
