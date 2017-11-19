import { Injectable } from '@angular/core';

import { Coord } from '../models/coords.model';
import { Device } from '../models/device.model';
import { GPSActivity } from '../models/gps.model';
import { User } from '../models/user.model';


@Injectable()
export class UserService {

  constructor(
  ) {
  }

  public getUserId(): string {
      const user: User =  JSON.parse(localStorage.getItem('user'));
      return user._id;
  }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): User {
    return this.getUserLocalStorage();
  }

  private getUserLocalStorage(): User {
    const user: User =  JSON.parse(localStorage.getItem('user'));
    return user;
  }

  public getDevices(): Array<Device> {
      const devices: Array<Device> = (JSON.parse(localStorage.getItem('user')) as User).devices;
      return devices;
  }


  public updateDeviceLocation(message): void {
    const { deviceId, coords, wakeupTime } = message;
    const newLocation: Coord = coords[0];
    const user: User = this.getUserLocalStorage();
    user.devices
      .find( device => device.deviceId === deviceId)
      .gpsData
      .find( data => data.wakeupTime === wakeupTime )
      .coords.push(newLocation);

    this.setUser(user);
  }

  public addDeviceActivity(message): void {
    const { deviceId, coords, wakeupTime } = message;
    const gpsActivity: GPSActivity = {
      wakeupTime: wakeupTime,
      coords: coords
    };
    const user: User = this.getUserLocalStorage();
    user.devices
      .find( device => device.deviceId === deviceId)
      .gpsData
      .push(gpsActivity);
    this.setUser(user);
  }

}
