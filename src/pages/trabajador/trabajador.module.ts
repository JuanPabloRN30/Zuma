import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrabajadorPage } from './trabajador';

@NgModule({
  declarations: [
    TrabajadorPage,
  ],
  imports: [
    IonicPageModule.forChild(TrabajadorPage),
  ],
  exports: [
    TrabajadorPage
  ]
})
export class TrabajadorModule {}
