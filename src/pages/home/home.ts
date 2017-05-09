import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

// Delete
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public authService: AuthService
             ) {
  }

  ionViewDidLoad(){
    //this.authService.getRemoteData();
  }

  ingresar(){
    this.navCtrl.push( LoginPage );
  }

  registrar(){
    this.navCtrl.push( RegisterPage );
  }

}
