import { Injectable } from '@angular/core';

import { Device } from '../models/device.model';
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

  public getUser(): User {
      const user: User =  JSON.parse(localStorage.getItem('user'));
      return user;
  }

  public getDevices(): Array<Device> {
      const devices: Array<Device> = (JSON.parse(localStorage.getItem('user')) as User).devices;
      return devices;
  }

}
