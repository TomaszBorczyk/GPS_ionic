import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';

import { Device } from '../models/device.model';
import { GPS } from '../models/gps.model';


@Injectable()
export class GPSService {
    private curretLoc: GPS;

  constructor(
      private geolocation: Geolocation
  ) {
  }

  public setCurrentLocaiton(location: GPS): void {
    this.curretLoc = location;
  }

  public watchPosition(): Observable<any> {
      return this.geolocation.watchPosition();
  }


}
