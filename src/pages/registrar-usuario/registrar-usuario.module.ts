import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrarUsuarioPage } from './registrar-usuario';

@NgModule({
  declarations: [
    RegistrarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrarUsuarioPage),
  ],
  exports: [
    RegistrarUsuarioPage
  ]
})
export class RegistrarUsuarioModule {}
