import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialPage } from './historial';

@NgModule({
  declarations: [
    HistorialPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialPage),
  ],
  exports: [
    HistorialPage
  ]
})
export class HistorialModule {}
