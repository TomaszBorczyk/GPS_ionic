import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { Coord } from '../../models/coords.model';
import { Device } from '../../models/device.model';
import { GPSActivity } from '../../models/gps.model';
import { User } from '../../models/user.model';

import { GPSService } from '../../services/gps.service';
import { LoginPage } from '../login/login';

const MAX_DISTANCE_PRECISE = 10;
const MAX_DISTANCE_METERS = 2000;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private i: number;
  private deviceLocation: Coord;
  public distance: number;
  public distanceDisplay: string;
  public user: User;
  public location: Coord = {lat: 1, lon: 1, date: new Date()};
  public error: {code: string, message: string} = { code: '', message: ''};
  public selectedDevice: Device;
  public lastLocation: Coord;
  public unit: string;

  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
    private localNotifications: LocalNotifications,
    private my_gpsService: GPSService) {
      this.i = 1;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.selectedDevice = this.user.devices[0];
      this.afterDeviceSelect();
      this.deviceLocation = {
        lat: 51.1256244,
        lon: 17.073622099999966,
        date: new Date()
      };
      const testLocation: Coord = {
        lat: 51.02542089999999,
        lon: 17.07778200000007,
        date: new Date()
      };
      this.distance = this.calculateDistance(this.deviceLocation, testLocation);
      this.distanceDisplay = this.formatDisplayDistance(this.distance);
      this.unit = this.determineUnit();
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

  public createNotification(): void {
    this.localNotifications.schedule({
      id: this.i,
      text: 'Single ILocalNotification',
    });
    this.i += 1;
  }

  public afterDeviceSelect(): void {
    this.selectLastLoction(this.selectedDevice);
  }

  private setDevices(): void {
    if (this.user.devices === []) {
      return;
    } else {
      this.selectedDevice = this.user.devices[0];
    }
    this.selectLastLoction(this.selectedDevice);
  }

  public selectLastLoction(device: Device): void {
    if (device == null) {
      this.lastLocation = null;
      return;
    }
    if (this.selectedDevice.gpsData.length === 0) {
      this.lastLocation = null;
      return;
    }
    const activity: GPSActivity = this.selectedDevice.gpsData[this.selectedDevice.gpsData.length - 1 ];
    this.lastLocation = activity.coords[activity.coords.length - 1 ];
  }

  private calculateDistance(coord1: Coord, coord2: Coord): number {
    const radius = 6373;
    const dLat = this.toRadians(coord2.lat - coord1.lat);
    const dLon = this.toRadians(coord2.lon - coord1.lon);
    const a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(coord1.lat) * Math.cos(coord2.lat) * Math.pow(Math.sin(dLon / 2), 2);
    // c = 2 * atan2( sqrt(a), sqrt(1-a));
    // distance = RADIUS * c;
    const distance = 2 * radius * Math.asin(Math.sqrt(a));
    return distance * 1000;
  }

  private toRadians(value: number): number {
    return (3.1415926536 / 180) * value;
  }

  private determineUnit(): string {
    return this.distance < MAX_DISTANCE_METERS ? 'm' : 'km';
  }

  private formatDisplayDistance(distance: number): string {
    if (distance < MAX_DISTANCE_PRECISE ) {
      return distance.toFixed(1);
    } else if (distance < MAX_DISTANCE_METERS ) {
      return distance.toFixed(0);
    } else {
      return (distance / 1000).toFixed(0);
    }
  }
}
