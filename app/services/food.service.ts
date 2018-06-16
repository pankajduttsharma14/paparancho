import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod} from '@angular/http';
import {AppSettingComponent} from '../app-setting/app-setting.component';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FoodService {
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
  // all categories
  GetAllCategories():Observable<any>
  {
    const url : string= this.BASE_URL+"Categories";
    
   
    return this.http.get(url,this.options).map(res=>res.json());
  }

  // get all brands
  GetAllBrands():Observable<any>
  {
    const url : string= this.BASE_URL+"brands-list-all";
    
    const headers = new Headers();
   
    return this.http.get(url,this.options).map(res=>res.json());
  }

    // get all brands
  GetAllItems():Observable<any>
  {
    const url : string= this.BASE_URL+"item-list-all";
    
   
   
    return this.http.get(url,this.options).map(res=>res.json());
  }


  // Add categories
   AddCategory(data):Observable<any>
  {
    let body=data;
    
    const url:string=this.BASE_URL+"addcategorie";
    return this.http.post(url,body,this.options).map(res=>res.json());


  }

    // Add Brands
   AddBrand(data):Observable<any>
  {
    let body=data;
    
    const url:string=this.BASE_URL+"addbrand";
    return this.http.post(url,body,this.options).map(res=>res.json());


  }

     // Add item
   AddItem(data):Observable<any>
  {
    let body=data;
    
    const url:string=this.BASE_URL+"additem";
    return this.http.post(url,body,this.options).map(res=>res.json());


  }
  // Delete brand
  DeleteBrand(id):Observable<any>
  {
    
    const url:string=this.BASE_URL+"deletebrand/id/"+id;
    return this.http.get(url,this.options).map(res=>res.json());
  }

  // edit brand
  UpdateBrand(body){
    const url:string=this.BASE_URL+"editbrand";
    return this.http.post(url,body,this.options).map(res=>res.json());
  }

  // Delete Category
  DeleteCategory(id):Observable<any>
  {
    
    const url:string=this.BASE_URL+"deleteCategorie/id/"+id;
    return this.http.get(url,this.options).map(res=>res.json());
  }

    // edit brand
  UpdateCategory(body){
    const url:string=this.BASE_URL+"editcategorie";
    return this.http.post(url,body,this.options).map(res=>res.json());
  }

  // Delete Category
  DeleteItem(id):Observable<any>
  {
    
    const url:string=this.BASE_URL+"deleteitem/id/"+id;
    return this.http.get(url,this.options).map(res=>res.json());
  }
     // edit brand
     UpdateItem(body){
      const url:string=this.BASE_URL+"edititem";
      return this.http.post(url,body,this.options).map(res=>res.json());
    }

    GetCategoryType(id):Observable<any>
    {
        const url:string=this.BASE_URL+"getcattype/catid/"+id;
        return this.http.get(url,this.options).map(res=>res.json());
    }

}
