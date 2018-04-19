import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Auth } from '../domain/entities';

@Injectable()
export class AuthService {
  auth: Auth = {user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in'};
  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);

  constructor(@Inject('user') private userService) { }

  getAuth(): Observable<Auth> {
    return this.subject.asObservable();
  }

  unAuth(): void {
    this.auth = Object.assign(
      {},
      this.auth,
      {user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in'});
    this.subject.next(this.auth);
  }

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
          auth.user = user;
          auth.hasError = false;
          localStorage.setItem('userId',user.id);
        } else {
          auth.hasError = true;
          auth.errMsg = 'password not match';
        }
        this.auth = Object.assign({}, auth);
        this.subject.next(this.auth);
        return auth;
      })
  }
}
