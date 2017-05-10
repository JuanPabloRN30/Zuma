import { Component } from '@angular/core';
import { Platform,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Trabajador } from '../models/user'
import { Cliente } from '../models/user'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  trabajador: Trabajador;
  cliente: Cliente;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public events: Events
             ) {
    /*platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });*/
    //this.listenToCustomerLogged();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //StatusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  /*listenToCustomerLogged(){
    this.events.subscribe('trabajador:logged',
    (trabajador) => {
      console.log('Escuche el login')
      this.trabajador = trabajador;
      this.platform.ready().then(() => {
        //if(this.platform.is('cordova'))
          //this.initPushNotification();
        });
    });
  }*/
}
