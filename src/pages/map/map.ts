import { AgmMap } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';

import { Coord } from '../../models/coords.model';
import { Device } from '../../models/device.model';
import { GPSActivity } from '../../models/gps.model';
import { User } from '../../models/user.model';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit {
  @ViewChild(AgmMap) agmMap: AgmMap;
  private routeDevice: string;
  private subscription: Subscription;

  public centerLocation: Coord;
  public origin: Coord;
  public destination: Coord;
  // public gpsActivities: Array<GPSActivity>;
  public devices: Array<Device>;
  public positions: Array<Coord>;

  public selectedActivity: GPSActivity;
  public selectedDevice: Device;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private my_userService: UserService,
    private my_socketService: SocketService
  ) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe( params => {
    //   this.routeDevice = params['device'] || '';
    //   this.setDevices();
    //   this.setMap();
    // });
    this.setDevices();
    this.setMap();

    this.my_socketService.locationChange.subscribe( message => {
      const {deviceId, coords, wakeupTime} = message;
      this.devices
        .find(device => device.deviceId === deviceId)
        .gpsData
        .find(activity => activity.wakeupTime === wakeupTime)
        .coords
        .push(coords[0]);
        this.triggerMapResize();
    });
  }

  private setDevices(): void {
    this.devices = this.my_userService.getDevices();
    if (this.devices === []) {
      return;
    }
    const device: Device =  this.devices.find( _device => _device.deviceId === this.routeDevice);
    if (device !== undefined) {
      this.selectedDevice = device;
      if ( device.gpsData.length !== 0) {
        this.setLatestActivity(device.gpsData);
      }
    } else {
      this.selectedDevice = this.devices[0];
    }
    this.selectActivity(this.selectedDevice.gpsData[this.selectedDevice.gpsData.length - 1]);
  }

  public selectDevice(device: Device): void {
    this.selectedDevice = device;
    this.selectedActivity = null;
  }

  public selectActivity(activity: GPSActivity): void {
    if (activity == null) {
      return;
    }
    this.selectedActivity = activity;
    this.setMapCenter(activity.coords[0]);
    this.triggerMapResize();
  }

  private setMap(): void {
    if (!this.selectedActivity) {
      this.setMapCenter({lat: 0, lon: 0, date: new Date()});
    }
  }

  private setMapCenter(coord: Coord): void {
    this.centerLocation = coord;
  }

  private setLatestActivity(gpsData: Array<GPSActivity>) {
    const lastActivity = gpsData[gpsData.length - 1];
    this.selectActivity(lastActivity);
  }

  private triggerMapResize() {
    this.agmMap.triggerResize(true).then( () => console.log('resize triggered'));
  }

  public formatDate(date: string): string {
    return new Date(date).toUTCString();
  }

}
