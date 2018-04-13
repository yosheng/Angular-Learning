import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo.model';

export class InMemoryTodoDbService implements InMemoryDbService {

  createDb() {
    let todos: Todo[] = [
      {
        id: '4ea2809a-f175-1126-dc7b-05343b5b29a6',
        desc: 'Getting up',
        completed: true
      },
      {
        id: 'b8da4b67-e176-0f01-92aa-0dba8ec8563f',
        desc: 'Go to School',
        completed: false
      }
    ];
    return {
      todos
    };
  }
  constructor() {

  }
}
