import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  loginWithCredentials(username: string, password: string): boolean {
    // tslint:disable-next-line:one-line
    if (username === 'wangpeng'){
      return true;
    }
    return false;
  }
}
