import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { User } from '../domain/entities';

@Injectable()
export class UserService {

  private api_url = 'http://localhost:3000/users';

  constructor(private client: HttpClient) { }

  findUser(username: string): Promise<User> {
    const url = `${this.api_url}/?username=${username}`;
    return this.client.get(url)
              .toPromise()
              .then(res => {
                let users = res as User[];
                return (users.length>0)?users[0]:null;
              })
              .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
