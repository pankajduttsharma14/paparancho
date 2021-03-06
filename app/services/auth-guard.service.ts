import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';


@Injectable()

export class AuthGuardService implements CanActivate, CanActivateChild{

  constructor(public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  	
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {

      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  	
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {

      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
