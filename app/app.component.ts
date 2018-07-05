import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {NotificationService} from './services/notification.service';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import {navItems} from './_nav';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/mergeMap';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers:[NotificationService],
  
 
  
})

export class AppComponent implements OnInit {
  ChangePasswordForm:FormGroup;
  @ViewChild('largeModel') public largeModel;
  constructor(private router: Router, private fb:FormBuilder, private titleService: Title, private activatedRoute: ActivatedRoute, private loading:Ng4LoadingSpinnerService,private NotificationService:NotificationService) {
      this.loading.show();
      router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    })

    
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

  // loader on route change
 // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      
        this.loading.show();
        
    }
    if (event instanceof NavigationEnd) {
      this.loading.hide();

    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading.hide();

    }
    if (event instanceof NavigationError) {
      this.loading.hide();

    }
  }


 
    
 
 



}
