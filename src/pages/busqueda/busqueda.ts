import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import {Solicitud} from '../../models/solicitud';
import {Interes} from '../../models/interes';
import {Categoria} from '../../models/categoria';

import {ResultsPage} from '../results/results';

import { areas_interes } from '../../providers/services-util';

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {

  solicitud: Solicitud;
  direccion: string;
  categoria: Categoria;
  interes: Interes;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,) {

    this.solicitud = new Solicitud({});
    this.categoria = new Categoria({});
    this.interes = new Interes({});
    this.categoria.nombre = "hogar";
  }

  goToResults()
  {
    if( !this.interes.nombre )
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
      this.interes.categoria = this.categoria;
      this.solicitud.interes = this.interes;
      this.solicitud.estado = "Pendiente";
      this.navCtrl.push(ResultsPage,{
        solicitud: this.solicitud
      });
    }
  }

}
