import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './domain/entities';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Awesome Todos';
  auth: Auth;
  constructor(@Inject('auth') private service, private router: Router){
  }
  ngOnInit() {

  }
  login() {
    this.router.navigate(['login']);
  }
  logout(){

  }
}
