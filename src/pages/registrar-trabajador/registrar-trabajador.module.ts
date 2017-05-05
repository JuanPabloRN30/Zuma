import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrarTrabajadorPage } from './registrar-trabajador';

@NgModule({
  declarations: [
    RegistrarTrabajadorPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrarTrabajadorPage),
  ],
  exports: [
    RegistrarTrabajadorPage
  ]
})
export class RegistrarTrabajadorModule {}
