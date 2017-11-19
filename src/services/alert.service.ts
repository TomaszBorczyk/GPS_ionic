import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

// import { SocketService } from '../services/socket.service';


@Injectable()
export class AlertService {

  constructor(
    private alertCtrl: AlertController,
    // private my_socketService: SocketService
  ) {
    // this.my_socketService.message.subscribe( message => {
    //   this.presentAlert(message.deviceId);
    // });
  }

  public presentAlert(name: string) {
    const alert = this.alertCtrl.create({
      title: 'Warning!',
      subTitle: `Suspicious activity on ${name}`,
      buttons: ['OK!']
    });
    alert.present();
  }

}
