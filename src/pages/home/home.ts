import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../models/user.model';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: User;


  constructor(public navCtrl: NavController, private menu: MenuController) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.menu.enable(true);
  }

}
