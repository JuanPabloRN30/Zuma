import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user'
import { Vendedor } from '../../models/user'
import { Cliente } from '../../models/user'

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  usuario: User;
  tipo: string;
  intereses: string[];

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
    console.log(this.tipo);
    if( this.tipo == "vendedor" )
    {

    }
    else
    {

    }
    if( this.intereses )
    {
      for( let interes of this.intereses )
      {
        console.log( interes );
      }
    }
  }

}
