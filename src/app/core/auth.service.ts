import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import { Auth } from '../domain/entities';

@Injectable()
export class AuthService {

  constructor(@Inject('user') private userService) { }

  loginWithCredentials(username: string, password: string): Observable<Auth> {
    return this.userService
      .findUser(username)
      .map(user => {
        let auth = new Auth();
        localStorage.removeItem('userId');
        let redirectUrl = (localStorage.getItem('redirectUrl') === null)?
          '/': localStorage.getItem('redirectUrl');
        auth.redirectUrl = redirectUrl;
        if (null === user){
          auth.hasError = true;
          auth.errMsg = 'user not found';
        } else if (password === user.password) {
          auth.user = Object.assign({}, user);
          auth.hasError = false;
          localStorage.setItem('userId',user.id);
        } else {
          auth.hasError = true;
          auth.errMsg = 'password not match';
        }

        return auth;
      })
  }
}
