import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

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

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  public logout() {
    this.my_authService.logout();
    this.my_socketService.disconnect();
    this.nav.push(LoginPage);
  }

  public openPage(page): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
