import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';

import { Device } from '../models/device.model';
import { GPSActivity } from '../models/gps.model';


@Injectable()
export class GPSService {
    private curretLoc: GPSActivity;

  constructor(
      private geolocation: Geolocation
  ) {
  }

  public setCurrentLocaiton(location: GPSActivity): void {
    this.curretLoc = location;
  }

  public watchPosition(): Observable<any> {
      return this.geolocation.watchPosition();
  }


}
