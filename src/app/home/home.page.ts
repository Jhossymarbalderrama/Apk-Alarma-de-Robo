import { Component,OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';

import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, IonRouterOutlet  } from '@ionic/angular';


// //plugins imports
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'; //Orientacion 
// import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';//
// import { Flashlight } from '@ionic-native/flashlight/ngx'; //Flash
// import { Vibration } from '@ionic-native/vibration/ngx'; //Vibracion
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';


import { ModalPasswordPage} from '../modal-password/modal-password.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  //Atributos
  private email: any; //Email de Usuario Ingresado
  private passwordLogin: any; //Password del Usuario Ingresado
  public load: boolean = true; //Spinner
  private verificarPassword: any;//Password Ingresada por el ShowDialog a Verificar
  private colorBoton: boolean = false;//Color Boton false:verder true:rojo

  //Sonidos
  audioIzquierda = "../../assets/sonidos/audioIzquierda.mp3";
  audioDerecha = "../../assets/sonidos/audioDerecha.mp3";
  audioVertical = "../../assets/sonidos/audioVertical.mp3";
  audioHorizontal = "../../assets/sonidos/audioHorizontal.mp3";
  audio = new Audio();

  //Ingresos para flash
  primerIngreso: boolean = true;
  primerIngresoFlash: boolean = true;

  //Orientacion Celular
  posicionActualCelular = 'actual';
  posicionAnteriorCelular = 'anterior';

  // Inclinacion
  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;

  ///DESARROLLAR
  subscription: any;
  presionado:boolean= false;

  constructor(
    private authSvc:AuthService, 
    private router: Router, 
    private afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    private modalCrtl: ModalController,
    private routerOutlet: IonRouterOutlet,

    private screenOrientation: ScreenOrientation,
    private deviceMotion: DeviceMotion,
    private flashlight: Flashlight,
    private vibration: Vibration
  ) {}
  
  ngOnInit(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);

    this.email = localStorage.getItem('email');
    this.passwordLogin = localStorage.getItem('password');
  }
  
  onLogout(){        
    this.load = false;

    setTimeout(() => {
      this.load = true;
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      this.afAuth.signOut();
      this.router.navigateByUrl('/login');   
    }, 500);       
  }

  async abrirModal(){
    const modal = await this.modalCrtl.create({
      component: ModalPasswordPage,
      componentProps:{        
        email: this.email,
        passwordLogin: this.passwordLogin
      },
      initialBreakpoint: 0.5,
      breakpoints: [0,0.5,1]
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();
     if(data.alarmaDesactivada){
        //Desactivo la Alarma
        //alert("Desactivo Alarma");
        this.colorBoton = false;

        this.audio.pause();//Paro los sonidos
        this.parar(); ///Paro la subscripcion al acceleration
     }else{
      this.colorBoton = true;      
     }
  }

  estadoBoton() {     
    /*false:verder true:rojo

      Inicia APP colorBoton: false
      colorBoton
        Verde = false : Apagado
        Toco = true : Prendido
    */
    if(this.colorBoton == false){   
      //Prendo el dispositivo
      this.colorBoton = true;
      //alert("Comienza");
      this.comenzar();      
    }else{
      //Trato de Apagar el Dispositivo
      //alert("Abro el Modal");
      this.abrirModal();      
    }
  }

  comenzar(){    
    this.subscription = this.deviceMotion.watchAcceleration({ frequency: 300 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accelerationX = Math.floor(acceleration.x);
      this.accelerationY = Math.floor(acceleration.y);
      this.accelerationZ = Math.floor(acceleration.z);

      if(acceleration.x > 5){
        //Inclinacion Izquierda
        //alert("Movimiento Izquierda");
        this.posicionActualCelular = 'izquierda';
        this.movimientoIzquierda();
      }
      else if (acceleration.x < -5) {
        //Inclinacion Derecha
        
        //alert("Movimiento Derecha");
        this.posicionActualCelular = 'derecha';
        this.movimientoDerecha();        
      }
      else if (acceleration.y >= 9) {
        //encender flash por 5 segundos y sonido
        this.posicionActualCelular='arriba';
        
        if ((this.posicionActualCelular!=this.posicionAnteriorCelular)) {
          this.audio.src = this.audioVertical;
          this.posicionAnteriorCelular = 'arriba';
        }
        this.audio.play();

        //alert("Movimiento Vertical");
        this.movimientoVertical();
      }

      else if (acceleration.z >= 9 && (acceleration.y >= -1 && acceleration.y <= 1) && (acceleration.x >= -1 && acceleration.x <= 1)) {
        //acostado vibrar por 5 segundos y sonido
        this.posicionActualCelular='plano';
        //alert("Movimiento Horizontal");
        this.movimientoHorizontal();
      }


    });
  }

  movimientoIzquierda(){
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if(this.posicionActualCelular!=this.posicionAnteriorCelular){
      this.posicionAnteriorCelular = 'izquierda';
      this.audio.src = this.audioIzquierda;
    }
    this.audio.play();
  }

  movimientoDerecha(){
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if(this.posicionActualCelular!= this.posicionAnteriorCelular){
      this.posicionAnteriorCelular = 'derecha';
      this.audio.src = this.audioDerecha;
    }
    this.audio.play();
  }

  movimientoVertical(){
    if(this.primerIngresoFlash){
      this.primerIngresoFlash ? this.flashlight.switchOn() : null;
      setTimeout(() => {
        this.primerIngresoFlash = false;
        this.flashlight.switchOff();
      }, 5000);
      this.primerIngreso = false;
    }
  }

  movimientoHorizontal(){
    if(this.posicionActualCelular!=this.posicionAnteriorCelular){
      this.posicionAnteriorCelular='plano';
      this.audio.src = this.audioHorizontal;
    }

    this.primerIngreso ? null : this.audio.play();
    this.primerIngreso ? null : this.vibration.vibrate(5000);
    this.primerIngreso = true;
    this.primerIngresoFlash = true;
  }


  parar() {
    this.primerIngreso = true;
    this.subscription.unsubscribe();
  }
}
