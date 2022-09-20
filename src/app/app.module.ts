import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


////Agregarr En App.module.ts (PROVIDER)
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
// import { DeviceMotion } from '@ionic-native/device-motion/ngx';
//import { Flashlight } from '@ionic-native/flashlight/ngx';
//import { Vibration } from '@ionic-native/vibration/ngx';

import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule],
  providers: [
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy},
      ScreenOrientation,
      DeviceMotion,
      Flashlight,
      Vibration
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
