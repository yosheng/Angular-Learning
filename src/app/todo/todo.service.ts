import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UUID } from 'angular2-uuid';

import {} from 'rxjs/add/operator/toPromise';

import { Todo } from '../domain/entities';

@Injectable()
export class TodoService {
  private api_url = 'http://localhost:3000/todos';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  todos: Todo[] = [];

  constructor(private client: HttpClient) {}

  // POST /todos
  addTodo(desc: string): Promise<Todo> {
    // "+" Convert string to number
    const userId: number = +localStorage.getItem('userId');
    let todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false,
      userId: userId
    };
    return this.client
      .post(this.api_url, JSON.stringify(todo), { headers: this.headers })
      .toPromise()
      .then(res => res as Todo)
      .catch(this.handleError);
  }
  // PUT /todos/:id
  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    console.log(url);
    let updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    return this.client
      .patch(url, JSON.stringify({completed: !todo.completed}), { headers: this.headers })
      .toPromise()
      .then(() => updatedTodo)
      .catch(this.handleError);
  }
  // DELETE /todos/:id
  deleteTodoById(id: string): Promise<void> {
    const url = `${this.api_url}/${id}`;
    return this.client
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  // GET /todos
  getTodos(): Promise<Todo[]> {
    const userId: number = +localStorage.getItem('userId');
    return this.client
      .get(`${this.api_url}?userId=${userId}`)
      .toPromise()
      .then(res => res as Todo[])
      .catch(this.handleError);
  }

  // GET /todos?completed=true/false
  filterTodos(filter: string): Promise<Todo[]> {
    const userId: number = +localStorage.getItem('userId');
    switch (filter) {
      case 'ACTIVE':
        return this.client
          .get(`${this.api_url}?completed=false&userId=${userId}`)
          .toPromise()
          .then(res => res as Todo[])
          .catch(this.handleError);
      case 'COMPLETED':
        return this.client
          .get(`${this.api_url}?completed=true&userId=${userId}`)
          .toPromise()
          .then(res => res as Todo[])
          .catch(this.handleError);
      default:
        return this.getTodos();
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
