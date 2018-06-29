import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';


@Injectable()

export class AnonymousGuardService implements CanActivate{

  constructor(public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  	
    var status = localStorage.getItem('loginStatus');
    var status=localStorage.getItem('loginStatus');


  if(status==="true")
  {
    this.router.navigate(['dashboard']);
    return false;
  }
  
    return true;
  }

 
}
