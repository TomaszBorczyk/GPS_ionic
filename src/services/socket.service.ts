import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as io from 'socket.io-client';

import { User } from '../models/user.model';
import { AlertService } from './alert.service';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';


@Injectable()
export class SocketService {
  private socketUrl: string;
  private socket;

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
        this.my_alertService.presentAlert(message.device);
        this.my_notificationService.alertUnwantedMovement(message);
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
