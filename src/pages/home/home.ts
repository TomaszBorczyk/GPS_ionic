import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: User;


  constructor(public navCtrl: NavController) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
