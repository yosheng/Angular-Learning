import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../domain/entities';

@Injectable()
export class UserService {

  private api_url = 'http://localhost:3000/users';

  constructor(private client: HttpClient) { }

  findUser(username: string): Observable<User> {
    const url = `${this.api_url}/?username=${username}`;
    return this.client.get(url)
      .map((res) => {
        console.log(res)
        let users = res as User[];
        return (users.length > 0) ? users[0] : null;
      });
  }
}
