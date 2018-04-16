import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    // If exist user then navigate to page
    if (localStorage.getItem('userId') !== null) { return true; }

    // Store the attempted URL for redirecting
    localStorage.setItem('redirectUrl', url);

    // Navigate to the login page with extras
    this.router.navigate(['/login']);

    // Cancel navigate
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
