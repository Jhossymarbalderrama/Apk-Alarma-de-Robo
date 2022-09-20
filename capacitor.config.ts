import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Alarma',
  webDir: 'www',
  bundledWebRuntime: true,

  plugins:{
    "SplashScreen": {
      "launchShowDuration": 3000,
      "launchAutoHide": false,
      "androidScaleType": "CENTER_CROP",
      "splashFullScreen": false,    
      "splashImmersive": false,    
      "backgroundColor": "#1C3461",    
      "androidSplashResourceName": "splash"    
    }
  }
};

export default config;
