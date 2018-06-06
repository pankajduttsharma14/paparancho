import {Injectable} from '@angular/core';

import {AppSettingComponent} from '../app-setting/app-setting.component';
import { Headers, Http, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable()

export class VouchersService{

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

	// get all vouchers list
	GetAllVouchers():Observable<any>
	{
		const url:string=this.BASE_URL+"voucherlist";
		return this.http.get(url,this.options).map(res=>res.json());
	}
	// Add Vouchers
  AddVoucher(data):Observable<any>
  {
    let body=data;

    const url:string=this.BASE_URL+"addvoucher";
    return this.http.post(url,data,this.options).map(res=>res.json());


  }
	// Delete VouchersService
	DeleteVoucher(id):Observable<any>
	{
			const url:string=this.BASE_URL+"deletevoucher/id/"+id;
			return this.http.get(url,this.options);

	}
	// Edit Voucher
	EditVoucher(data):Observable<any>
	{
			const url:string=this.BASE_URL+"editvoucher";
			return this.http.post(url,data,this.options);
	}


}
