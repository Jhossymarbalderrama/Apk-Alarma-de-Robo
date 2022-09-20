import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonToggleModule,
    MatDialogModule
  ]
})
export class AppMaterialModule { }
