// login.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Auth, Photo } from '../domain/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  photo = '/assets/login_default_bg.jpg';
  slides: Photo[] = [];
  auth: Auth;

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

}
