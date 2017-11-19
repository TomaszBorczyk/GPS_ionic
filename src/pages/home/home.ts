import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Vibration } from '@ionic-native/vibration';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { Coord } from '../../models/coords.model';
import { Device } from '../../models/device.model';
import { GPSActivity } from '../../models/gps.model';
import { User } from '../../models/user.model';

import { GPSService } from '../../services/gps.service';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';

import { LoginPage } from '../login/login';

const MAX_DISTANCE_PRECISE = 10;
const MAX_DISTANCE_METERS = 2000;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private phoneLocation: Coord;
  public distance: number;
  public distanceDisplay: string;
  public user: User;
  public location: Coord = {lat: 1, lon: 1, date: new Date()};
  public selectedDevice: Device;
  public lastLocation: Coord;
  public unit: string;

  public data: string;
  public error: string;

  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
    private localNotifications: LocalNotifications,
    private my_gpsService: GPSService,
    private my_socketService: SocketService,
    private my_userService: UserService,
    private vibration: Vibration) {
      this.phoneLocation = {
        lat: 51.1256244,
        lon: 17.073622099999966,
        date: new Date()
      };
      // this.phoneLocation = null;

      this.getUserLocalStorage();
      this.setDevices();
      this.setDistanceData();
      this.menu.enable(true);

      this.my_socketService.locationChange.subscribe( change => {
        switch (change.type) {
          case 'alert':
            this.setNewGPSActivity(change);
            break;
          case 'update':
            this.setNewLocation(change);
            break;
        }
        this.lastLocation = change.coords[0];
        this.setDistanceData();
        this.vibrateIfClose();
      });

      this.my_gpsService.watchPosition()
      .subscribe(data => {
        this.data = JSON.stringify(data);
        if (Object.keys(data).length === 0) {
          return;
        }
        this.phoneLocation = {
          lat: data.coords.latitude,
          lon: data.coords.longitude,
          date: new Date()
        };
      },
      err => {
        this.error = JSON.stringify(err);
      });
  }

  public afterDeviceSelect(): void {
    this.selectLastLoction(this.selectedDevice);
    this.setDistanceData();
  }

  private getUserLocalStorage(): void {
    // this.user = JSON.parse(localStorage.getItem('user'));
    this.user = this.my_userService.getUser();
  }

  private setDevices(): void {
    if (this.user.devices === []) {
      return;
    } else {
      this.selectedDevice = this.user.devices[0];
    }
    this.selectLastLoction(this.selectedDevice);
  }

  private setDistanceData(): void {
    if (this.lastLocation != null) {
      this.distance = this.calculateDistance(this.phoneLocation, this.lastLocation);
      this.distanceDisplay = this.formatDisplayDistance(this.distance);
      this.unit = this.determineUnit();
    } else {
      this.distanceDisplay = 'No data';
      this.unit = '';
    }
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

  private setNewGPSActivity(message: any): void {
    const newGPSActivity: GPSActivity = {wakeupTime: message.wakeupTime, coords: message.coords};
    this.user.devices
      .find(device => device.deviceId === message.deviceId)
      .gpsData
      .push(newGPSActivity);
  }

  private setNewLocation(message: any): void {
    const gpsData = this.user.devices
      .find(device => device.deviceId === message.deviceId)
      .gpsData;
    gpsData[gpsData.length - 1].coords.push(message.coords[0]);
  }

  private vibrateIfClose(): void {
    if (this.distance < 10) {
      this.vibrate(1000);
    }
  }

  private vibrate(msDuration: number): void {
    this.vibration.vibrate(msDuration);
  }


}
