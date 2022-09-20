import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPasswordPage } from './modal-password.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPasswordPageRoutingModule {}
