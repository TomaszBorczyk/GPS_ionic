import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { GPS } from '../../models/gps.model';
import { User } from '../../models/user.model';
import { GPSService } from '../../services/gps.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private i: number;
  public user: User;
  public location: GPS = {lat: 1, lon: 1, date: new Date()};
  public error: {code: string, message: string} = { code: '', message: ''};

  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
    private localNotifications: LocalNotifications,
    private my_gpsService: GPSService) {
      this.i = 1;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu.enable(true);

      // this.my_gpsService.watchPosition()
      // .subscribe(data => {
      //   this.location.lat = data.coords.latitude;
      //   this.location.lon = data.coords.longitude;
      // },
      // error => {
      //   this.error = error;
      // });
  }

  public createNotification() {
    this.localNotifications.schedule({
      id: this.i,
      text: 'Single ILocalNotification',
    });
    this.i += 1;
  }

}
