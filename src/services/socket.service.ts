import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

import { User } from '../models/user.model';
import { AlertService } from './alert.service';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';


@Injectable()
export class SocketService {
  private socketUrl: string;
  private socket;
  public locationChange = new Subject<any>();

  constructor(
      private my_userService: UserService,
      private my_alertService: AlertService,
      private my_notificationService: NotificationService,
  ) {
    // this.socketUrl = 'http://127.0.0.1:4567';
    this.socketUrl = 'https://gps-tracker.herokuapp.com';

  }

  private setSocketListen() {
    this.socket.on('alert', message => {
        Object.assign(message, {type: 'alert'});
        this.locationChange.next(message);
        this.my_userService.addDeviceActivity(message);
        this.my_alertService.presentAlert(message.name);
        this.my_notificationService.alertUnwantedMovement(message.name);
    });

    this.socket.on('update', message => {
        Object.assign(message, {type: 'update'});
        this.locationChange.next(message);
        this.my_userService.updateDeviceLocation(message);
        this.my_alertService.presentAlert(message.name);
        this.my_notificationService.alertUnwantedMovement(message.name);
    });
  }

  public emitUserId() {
      const userId = this.my_userService.getUserId();
      this.socket.emit('add-user', userId);
  }

  public initSocket() {
    this.socket = io(this.socketUrl);
    this.setSocketListen();
  }

  public disconnect() {
      this.socket.disconnect();
  }

}
