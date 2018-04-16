import { Component, OnInit, Inject } from '@angular/core';
import { Todo } from '../domain/entities';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo [] = [];
  desc = '';

  constructor(
    @Inject('todoService') private service,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let filter = params['filter'];
      this.filterTodos(filter);
    });
  }

  filterTodos(filter: string): void{
    this.service
      .filterTodos(filter)
      .then(todos => this.todos = [...todos]);
  }

  addTodo() {
    this.service
      .addTodo(this.desc)
      .then(todo => {
        this.todos = [...this.todos, todo];
        this.desc = '';
      });
  }

  onTextChanges(value) {
    this.desc = value;
  }

  async toggleTodo(todo: Todo): Promise<void> {
    const i = this.todos.indexOf(todo);
    this.service
      .toggleTodo(todo)
      .then(t => {
        this.todos = [
          ...this.todos.slice(0,i),
          t,
          ...this.todos.slice(i+1)
          ];
          return null;
      });
  }
  async removeTodo(todo: Todo): Promise<void> {
    const i = this.todos.indexOf(todo);
    this.service
      .deleteTodoById(todo.id)
      .then(()=> {
        this.todos = [
          ...this.todos.slice(0,i),
          ...this.todos.slice(i+1)
        ];
        return null;
      });
  }

  toggleAll() {
    Promise.all(this.todos.map(todo => this.toggleTodo(todo)));
  }

  clearCompleted() {
    const completed_todos = this.todos.filter(todo => todo.completed === true);
    const active_todos = this.todos.filter(todo => todo.completed === true);
    Promise.all(completed_todos.map(todo => this.service.deleteTodoById(todo.id)))
    .then(() => this.todos = [...active_todos]);
  }
}
