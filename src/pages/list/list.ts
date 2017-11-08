import { Component } from '@angular/core';

import { Device } from '../../models/device.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public devices: Array<Device>;

  constructor(
    private my_userService: UserService
  ) {
    this.devices = this.my_userService.getDevices();
  }

}
