import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Injectable()
export class NotificationService {

  constructor(
    private localNotifications: LocalNotifications
  ) {}

  public alertUnwantedMovement(message: string) {
    this.localNotifications.schedule({
      id: 1,
      text: `Unwanted movement on ${message}!`,
    });
  }

}
