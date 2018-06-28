import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod} from '@angular/http';
import {AppSettingComponent} from '../app-setting/app-setting.component';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrderService {
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

    
  // Get all orders
	GetAllOrder():Observable<any>	
	{
		const url : string= this.BASE_URL+"outletorderlist";    
		
    return this.http.get(url,this.options).map(res=>res.json());
	}

  // Get Orders by ID
  GetRecordsById(id):Observable<any>{
    const url : string= this.BASE_URL+"orderdetail/orderid/"+id;
    return this.http.get(url,this.options).map(res=> res.json());
  }

  // cancel order
  CancelOrder(id):Observable<any>{
    const url: string= this.BASE_URL+"cancelorder/orderid/"+id;
    return this.http.get(url,this.options).map(res=>res.json());
  }
  GenerateBill(id):Observable<any>{
    const url: string= this.BASE_URL+"generatebill/orderid/"+id;
    return this.http.get(url,this.options).map(res=>res.json());
  }
  PaymentReceived(data)
  {
     let body=data;    
    const url:string=this.BASE_URL+"payment";
    return this.http.post(url,body,this.options).map(res=>res.json());
  }


  
}
