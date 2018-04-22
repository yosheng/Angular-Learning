// login.component.ts
import { Component, OnInit, Inject, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';

import { Auth, Photo } from '../domain/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  photo = '/assets/login_default_bg.jpg';
  slides: Photo[] = [];
  auth: Auth;
  loginBtnState = 'inactive';

  constructor(
    @Inject('auth') private service,
    @Inject('flickr') private flickrService,
    private router: Router) {}

  ngOnInit() {
    this.flickrService.getResult('wallpaper')
      .subscribe((photo: Photo[]) => {
      this.slides = [...photo];
      this.rotateImages(this.slides);
    });;
  }

  onSubmit(formValue) {
    this.service
      .loginWithCredentials(formValue.login.username, formValue.login.password)
      .subscribe(auth => {
        let redirectUrl = (auth.redirectUrl === null)? '/': auth.redirectUrl;
        if(!auth.hasError){
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl');
        } else {
          this.auth = Object.assign({}, auth);
        }
      });
  }

  rotateImages(arr: Photo[]){
    const length = arr.length
    let i = 0;
    setInterval(() => {
      i = (i + 1) % length;
      this.photo = this.slides[i].url;
    }, 20000);
  }

  toggleLoginState(btnState: boolean){
    this.loginBtnState = btnState ? 'active' : 'inactive';
  }
}
