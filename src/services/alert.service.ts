import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Injectable()
export class AlertService {

  constructor(
    private alertCtrl: AlertController,
  ) {}

  public presentAlert(device_id: string) {
    const alert = this.alertCtrl.create({
      title: 'Warning!',
      subTitle: `Suspicious activity on ${device_id}`,
      buttons: ['OK!']
    });
    alert.present();
  }

}
