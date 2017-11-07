import { Injectable } from '@angular/core';

import { User } from '../models/user.model';


@Injectable()
export class UserService {

  constructor(
  ) {
  }

  public getUserId(): string {
      const user: User =  JSON.parse(localStorage.getItem('user'));
      return user.id;
  }

  public getUser(): User {
      const user: User =  JSON.parse(localStorage.getItem('user'));
      return user;
  }

}
