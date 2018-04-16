// Do not enter newline for each class
export class Todo {
  id: string;
  desc: string;
  completed: boolean;
}
export class User {
  id: number;
  username: string;
  password: string;
}
export class Auth {
  user: User;
  hasError: boolean;
  errMsg: string;
  redirectUrl: string;
}
