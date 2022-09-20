import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPasswordPageRoutingModule } from './modal-password-routing.module';

import { ModalPasswordPage } from './modal-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPasswordPageRoutingModule
  ],
  declarations: [ModalPasswordPage]
})
export class ModalPasswordPageModule {}
