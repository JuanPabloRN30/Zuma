import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ClientePage } from '../pages/cliente/cliente';
import { TrabajadorPage } from '../pages/trabajador/trabajador';
import { BusquedaPage } from '../pages/busqueda/busqueda';
import { ResultsPage } from '../pages/results/results';

import { AuthService } from '../providers/auth-service'
import { UserDataService } from '../providers/user-data-service'
import { SolicitudesService } from '../providers/solicitudes-service'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ClientePage,
    TrabajadorPage,
    BusquedaPage,
    ResultsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ClientePage,
    TrabajadorPage,
    BusquedaPage,
    ResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UserDataService,
    SolicitudesService
  ]
})
export class AppModule {}
