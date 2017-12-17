import { AgmCoreModule } from '@agm/core';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Vibration } from '@ionic-native/vibration';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { GPSService } from '../services/gps.service';
import { NotificationService } from '../services/notification.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    LoginPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJQ3YYQe4d37-LIG_84zwUQF4_Bior3ZA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    LoginPage
  ],
  providers: [
    AlertService,
    AuthService,
    LocalNotifications,
    Vibration,
    Geolocation,
    GPSService,
    NotificationService,
    SocketService,
    SplashScreen,
    StatusBar,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
