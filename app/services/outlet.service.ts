import { Injectable,NgZone } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod} from '@angular/http';
import {AppSettingComponent} from '../app-setting/app-setting.component';
import {Observable} from 'rxjs/Rx';

@Injectable()

export class OutletService{
  
  private headers:Headers;
  private BASE_URL:string;
  private options:RequestOptions;

  constructor(private http:Http) {  
    
  	this.BASE_URL = AppSettingComponent.API_ENDPOINT;
    this.headers=new Headers();
    // this.headers.append('Content-Type', 'application/json');
    this.headers.append('client-service', 'PR2018PS');  
    this.headers.append('auth-key', '5ccd7b534b19d30030c6503f3a852d00');
    this.headers.append('enctype', 'multipart/form-data');
	  this.options=new RequestOptions({headers:this.headers});
}

	GetOutletProfile():Observable<any>
	{
		const url : string= this.BASE_URL+"outletprofile";
		return this.http.get(url,this.options);
	}	

    GetLocation(address){
    const url: string= 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyBTjAZKYtZiS7KHMJwDw53-t2QITTsugGU';
    return this.http.get(url).map(res=>res.json());
  }
  
    AddOutlet(data){
    const url : string= this.BASE_URL+"add-outlet";
    return this.http.post(url,data,this.options).map(res=>res.json());
  }
  
}


