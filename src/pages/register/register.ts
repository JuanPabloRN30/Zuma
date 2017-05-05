import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user'

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  usuario: User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.get('usuario'))
    {
      this.usuario = this.navParams.get('usuario');
      console.log('recibi algo');
    }
    else
    {
      this.usuario = new User({});
      console.log('no recibi nada');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  registrar(){
    console.log('Los datos son: ');
    console.log(this.usuario.nombre_completo);
    console.log(this.usuario.email);
    console.log(this.usuario.password);
  }

}
