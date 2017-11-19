import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';

// import { SocketService } from './socket.service';



@Injectable()
export class NotificationService {

  constructor(
    private localNotifications: LocalNotifications,
    // private my_socketService: SocketService
  ) {
    // this.my_socketService.message.subscribe( message => {
    //   this.alertUnwantedMovement(message.deviceId);
    // });
  }

  public alertUnwantedMovement(name: string) {
    this.localNotifications.schedule({
      id: 1,
      text: `Unwanted movement on ${name}!`,
    });
  }

}
