import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import {Solicitud} from '../../models/solicitud';
import {Interes} from '../../models/interes';
import {Categoria} from '../../models/categoria';

import {ResultsPage} from '../results/results';

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {

  solicitud: Solicitud;
  direccion: string;
  fecha: Date;
  categoria: Categoria;
  interes: Interes;
  minDate: string;
  maxDate: string;
  today: Date;

  areas_interes: any ={
    'Hogar': [ 'Electricidad','Plomeria','Cerrajeria' ],
    'Alimentacion': [ 'Comida Rapida','Postres','Comida Tipica','Reposteria','Panaderia' ],
    'Belleza': [ 'Maquillaje','Manicure','Pedicure','Tintes','Corte','Depilacion','Masajes' ],
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,) {

    this.solicitud = new Solicitud({});
    this.categoria = new Categoria({});
    this.interes = new Interes({});
    this.categoria.nombre = "hogar";
    this.today = new Date();
    var month = "";
    if( this.today.getMonth() < 10 )
      month = '0' + this.today.getMonth();
    else
      month = ''+this.today.getMonth();
    this.minDate = `${this.today.getFullYear()}-${month}-${this.today.getDate()}`
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Busqueda');
  }

  goToResults()
  {
    if( !this.solicitud.direccion || !this.solicitud.fecha || !this.interes.nombre )
    {
      var alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Por favor seleccione todos los datos',
        buttons: ['OK']
      });
      alert.present();
    }
    else
    {
      this.solicitud.fecha = new Date(this.solicitud.fecha);
      this.solicitud.fecha = new Date( this.solicitud.fecha.getTime() + Math.abs(this.solicitud.fecha.getTimezoneOffset()*60000) );
      this.interes.categoria = this.categoria;
      this.solicitud.interes = this.interes;
      this.solicitud.estado = "Pendiente";
      this.navCtrl.push(ResultsPage,{
        solicitud: this.solicitud
      });
    }
  }

}
