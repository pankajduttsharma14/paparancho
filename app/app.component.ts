import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import {navItems} from './_nav';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/mergeMap';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',

})

export class AppComponent implements OnInit {
  ChangePasswordForm:FormGroup;

  @ViewChild('largeModel') public largeModel;
  constructor(private router: Router, private fb:FormBuilder, private titleService: Title, private activatedRoute: ActivatedRoute) {
    
    
  }





  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
         
        return;

      }
      window.scrollTo(0, 0)
    });

    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }
  



}
