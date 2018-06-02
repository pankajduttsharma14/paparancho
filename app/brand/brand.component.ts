import { Component, OnInit,ViewChild } from '@angular/core';
import { FoodService} from '../services/food.service';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  providers:[FoodService]
})
export class BrandComponent implements OnInit {
@ViewChild('largeModal') public largeModal: ModalDirective;
	  // formsettings
     AddBrandForm:FormGroup;
     ol_id:number;
     brand_title:string;
     brand_img:string; 
     status:string;
  
  public brands:any={};
  p: number = 1;
  constructor(private FoodService:FoodService, private router:Router, formbuilder:FormBuilder) {
  	var status=localStorage.getItem('loginStatus');
  	if(status!="true")
  	{
  		this.router.navigate(['login']);
  	}
	  this.FoodService.GetAllBrands().subscribe(res=>{this.brands=res;},err=>{console.log(err)});

   // Add Form intitilized
    this.AddBrandForm = formbuilder.group({
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "brand_title": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "brand_img":['',Validators.compose([Validators.required])],
      "status": ['', Validators.required]


    });

  }

  ngOnInit() {
  }
  BrandMsg:string;
  // Add brands
  AddBrand(formData){
    let data=formData.value;
    formData.reset();
    this.FoodService.AddBrand(data).subscribe(res=>{
        if(res.status==200)
        {  
          this.BrandMsg=res.message;
          this.FoodService.GetAllBrands().subscribe(res=>{this.brands=res;},err=>{console.log(err)});
           setTimeout(()=>{
               this.BrandMsg=null;
               this.largeModal.hide();

           },3000);
        }  

        else
        {
          this.BrandMsg="Can't Add Brand";
          setTimeout(()=>{
               this.BrandMsg=null;
               this.largeModal.hide();

           },3000);
        }



    },err=>{
      this.BrandMsg="Can't Add Brand";
      setTimeout(()=>{
               this.BrandMsg=null;
               this.largeModal.hide();

           },3000);


    });
  }
}
