import { Injectable, OnInit } from '@angular/core';
// import { Http, RequestOptions } from '@angular/common/http';
import {AppSettingComponent} from '../app-setting/app-setting.component';
import { Headers, Http, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable()
export class NotificationService implements OnInit{
	ngOnInit()
	{

	}
	private options:any;
	private headers:any;
	private BASE_URL: string = AppSettingComponent.API_ENDPOINT;
	constructor(private http:Http){
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
        this.headers.append('client-service', 'PR2018PS');	
        this.headers.append('auth-key', '5ccd7b534b19d30030c6503f3a852d00');
        this.options=new RequestOptions({headers:this.headers});
	}



	GetAllNotifications():Observable<any>
	{
		const url:string=this.BASE_URL+'notificationlist';
		return this.http.get(url,this.options).map(res=>res.json());
	}
  
	 
  
  

}