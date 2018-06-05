import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod} from '@angular/http';
import {AppSettingComponent} from '../app-setting/app-setting.component';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class StaffService {
  // base Url
  private BASE_URL: string = AppSettingComponent.API_ENDPOINT;

  private headers:Headers;
  
  private options:RequestOptions;

  constructor(private http:Http) { 
    this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
    	this.headers.append('client-service', 'PR2018PS');	
    	this.headers.append('auth-key', '5ccd7b534b19d30030c6503f3a852d00');
      this.options=new RequestOptions({headers:this.headers,method:RequestMethod.Get});
  }	
	// Get staff Roles  
  	 GetStaffRoles():Observable<any>
  	{
    	const url : string= this.BASE_URL+"staffrolelist";
    	return this.http.get(url,this.options).map(res=>res.json());
  	}
    // Get staff List  
     GetStaffList():Observable<any>
    {
      const url : string= this.BASE_URL+"stafflist";
      
      return this.http.get(url,this.options).map(res=>res.json());
    }
    // Add Staff Role
    AddStaffRole(data):Observable<any>
    {
      let body=data;
      const url : string= this.BASE_URL+"addstaffrole";
      return this.http.post(url,body,this.options).map(res=>res.json());
    }
    // Add Staff Role
    AddStaff(data):Observable<any>
    {
      let body=data;
      const url : string= this.BASE_URL+"addstaff";
      return this.http.post(url,body,this.options).map(res=>res.json());
    }
    // DeleteStaffRole

    DeleteStaffRole(id){
             const url : string= this.BASE_URL+"deletestaffrole/id/"+id;
             return this.http.get(url,this.options).map(res=>res.json());   
    }

    // Edit Staff Role

    EditStaffRole(data){
             const url : string= this.BASE_URL+"editstaffrole";
             return this.http.post(url,data,this.options).map(res=>res.json());   
    }

     // DeleteStaffRole

    DeleteStaff(id){
             const url : string= this.BASE_URL+"deletestaff/id/"+id;
             return this.http.get(url,this.options).map(res=>res.json());   
    }
        
    
    // Edit Staff Role

    EditStaffList(data){
             const url : string= this.BASE_URL+"editstaff";
             return this.http.post(url,data,this.options).map(res=>res.json());   
    }

}
