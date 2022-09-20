import { Component, OnInit , Input} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { modalController } from '@ionic/core';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.page.html',
  styleUrls: ['./modal-password.page.scss'],
})
export class ModalPasswordPage implements OnInit {
  @Input() email;
  @Input() passwordLogin;
  public password: any;

  constructor(
    private modalCtrl: ModalController, 
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }


  async ErrorContraseña() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Contraseña Incorrecta!!! :C',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  async DesactivacionAlarma() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Alarma Desactivada!!! :)',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }



  onVerificarPassword(){
    if(this.password === this.passwordLogin){
      this.DesactivacionAlarma();     
      this.modalCtrl.dismiss({        
        alarmaDesactivada: true
      });      
    }else{
      this.ErrorContraseña();
    }
  }
}
