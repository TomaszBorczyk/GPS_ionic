import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model';
import { SocketService } from './socket.service';


@Injectable()
export class AuthService {
  apiServer: string;

  constructor(
    private http: Http,
    private my_socketService: SocketService,
  ) {
    // this.apiServer = 'http://127.0.0.1:4567/api/v1';
    this.apiServer = 'https://gps-tracker.herokuapp.com/api/v1';
  }


  public register(email: string, password: string): Promise<boolean> {
    const body = {email: email, password: password };

    return this
      .postHTTP('/user/register', body)
      .then( (res: Response) => {
        const resJson = res.json();
        if (resJson.success === true) {
          return true;
        } else {
          throw(resJson.error.message);
        }
      });
  }

  public login(email: string, password: string): Promise<void> {
    const body = {email: email, password: password };
    return this
      .postHTTP('/user/login', body)
      .then( (res: Response) => {
        const resUser: User = res.json().user;
        localStorage.setItem('user', JSON.stringify(resUser));
        this.my_socketService.initSocket();
        this.my_socketService.emitUserId();
      });
    }

  public logout(): void {
    localStorage.removeItem('user');
    this
      .postHTTP('/user/logout', {})
      .then( (res: Response) => {
        if (res.json().success === true) {
        }
      });
  }


  private postHTTP(route: string, body: Object): Promise<any> {
    return this
      .http
      .post(this.apiServer + route, body)
      .toPromise();
  }
}


