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
  intereses_h: string[];
  intereses_a: string[];
  intereses_b: string[];

  areas_interes: any ={
    'Hogar': [ 'Electricidad','Plomeria','Cerrajeria' ],
    'Alimentacion': [ 'Comida Rapida','Postres','Comida Tipica','Reposteria','Panaderia' ],
    'Belleza': [ 'Maquillaje','Manicure','Pedicure','Tintes','Corte','Depilacion','Masajes' ],
  };


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
    if( this.intereses_h )
    {
      for( let interes of this.intereses_h )
      {
        console.log( interes );
      }
    }
    if( this.intereses_a )
    {
      for( let interes of this.intereses_a )
      {
        console.log( interes );
      }
    }
    if( this.intereses_b )
    {
      for( let interes of this.intereses_b )
      {
        console.log( interes );
      }
    }
  }

}
