import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { ModalPasswordPage } from '../modal-password/modal-password.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AppMaterialModule
  ],
  declarations: [HomePage, ModalPasswordPage]
})
export class HomePageModule {}
