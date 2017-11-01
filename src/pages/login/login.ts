import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginFailed: boolean;

  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required': 'Username is required',
    },

    'password': {
      'required': 'Password is required',
    }

  };

  constructor(
      private my_AuthService: AuthService,
      private fb: FormBuilder,
      public navCtrl: NavController,
      public navParams: NavParams,
      public menu: MenuController
    ) {
      this.loginFailed = false;
      this.menu.enable(false);
    }

    ngOnInit() {
      this.buildForm();
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
    }


    buildForm(): void {
    this.loginForm = this.fb.group({
      'username': ['', [
          Validators.required,
        ]
      ],
      'password': ['', [
          Validators.required,
        ]
      ]
    });

    this.loginForm.valueChanges
        .subscribe(
          data => this.onValueChanged(data)
        );

    this.onValueChanged();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username: string = this.loginForm.get('username').value;
      const password: string = this.loginForm.get('password').value;

      this.my_AuthService
          .login(username, password)
          .then( () => {
            console.log('hey');
            this.navCtrl.setRoot(HomePage);
            this.navCtrl.push(HomePage);
          })
          .catch( err => {
            this.loginFailed = true;
          });
    }
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
       return;
    }
    const form = this.loginForm;
    this.loginFailed = false;

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key];
        }
      }
    }
  }



}





