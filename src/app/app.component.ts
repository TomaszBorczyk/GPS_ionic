import { Component, OnDestroy, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';

import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';

import * as io from 'socket.io-client';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  private socket;
  public rootPage: any = LoginPage;
  public pages: Array<{title: string, component: any}>;


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private my_authService: AuthService,
    private my_socketService: SocketService) {
    this.checkIfLoggedIn();
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Map', component: MapPage }
    ];

  }

  public logout() {
    this.my_authService.logout();
    this.my_socketService.disconnect();
    this.nav.push(LoginPage);
  }

  public openPage(page): void {
    this.nav.setRoot(page.component);
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private checkIfLoggedIn(): void {
    if (localStorage.getItem('user') == null) {
      this.rootPage = LoginPage;
    } else {
      this.rootPage = HomePage;
      this.my_socketService.initSocket();
      this.my_socketService.emitUserId();
    }
  }



}
