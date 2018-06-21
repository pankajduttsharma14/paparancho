import {Injectable} from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod} from '@angular/http';
import {AppSettingComponent} from '../app-setting/app-setting.component';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class TaxService{
  private headers:Headers;
  private BASE_URL:string;
  private options:RequestOptions;
			
  constructor(private http:Http) { 
    this.BASE_URL = AppSettingComponent.API_ENDPOINT;
    this.headers=new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('client-service', 'PR2018PS');  
    this.headers.append('auth-key', '5ccd7b534b19d30030c6503f3a852d00');
    this.options=new RequestOptions({headers:this.headers});

  }
  // Get tax
  GetAllTax():Observable<any>
  {
  	const url : string= this.BASE_URL+"taxlist";
  	return this.http.get(url,this.options).map(res=>res.json());
  }

  // Add tax
  AddTax(data:any):Observable<any>
  {
    const url : string= this.BASE_URL+"addtax";
    return this.http.post(url,data,this.options).map(res=>res.json());
  }
  // Delete tax
  DeleteTax(id):Observable<any>
  {
    const url : string= this.BASE_URL+"deletetax/id/"+id;
    return this.http.get(url,this.options).map(res=>res.json());
  }
  // Delete tax
  UpdateTax(data):Observable<any>
  {
    const url : string= this.BASE_URL+"edittax";
    return this.http.post(url,data,this.options).map(res=>res.json());
  }

}
