import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  providers: [FoodService]
})
export class ItemsComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  p: number = 1;
  public items: any = {};
  AddItemsForm:FormGroup;
  // form settings
    ol_id:number;
    icid:string;
    brand_id:string;
    item_title:string;
    item_price:number;
    min_bar_price:number;
    max_bar_price:number;
    item_img_url:string;
    item_img_name:string;
    item_stock:number;
    status:string;

  constructor(private FoodService: FoodService, private router: Router, private FormBuilder:FormBuilder) {
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
    this.FoodService.GetAllItems().subscribe(res => {this.items = res;},err => {});

      // form initilization
      this.AddItemsForm=this.FormBuilder.group({

        "ol_id": ['',Validators.compose([Validators.required,Validators.min(1)])],
        'icid':['',Validators.compose([Validators.required,Validators.min(1)])],
        'brand_id':['',Validators.compose([Validators.required,])],
        'item_title':['',Validators.compose([Validators.required,])],
        'item_price':['',Validators.compose([Validators.required,Validators.min(1)])],
        'min_bar_price':['',Validators.compose([Validators.required,Validators.min(1)])],
        'max_bar_price':['',Validators.compose([Validators.required,Validators.min(1)])],
        'item_img_url':['',Validators.compose([Validators.required,])],
        'item_img_name':['',Validators.compose([Validators.required,])],
        'item_stock':['',Validators.compose([Validators.required,])],
        'status':['',Validators.compose([Validators.required,])],


      });



  }
  // vars
  catList={};
  brandList={};
  AddItemMsg:string=null;
  ngOnInit() {
      this.catList=JSON.parse(localStorage.getItem('categories'));
      this.brandList=JSON.parse(localStorage.getItem('brands'));

      

  }
  AddItems(formData)
  {
     let data=formData.value;
     formData.reset();

     this.FoodService.AddItem(data).subscribe(res=>{
         if(res.status==200)
         {
           this.AddItemMsg=res.message;
           this.FoodService.GetAllItems().subscribe(res => {this.items = res;},err => {});
           setTimeout(()=>{
               this.AddItemMsg=null;
               this.largeModal.hide();

           },3000);
         }
         else{

           this.AddItemMsg="Item Can't Added";
           setTimeout(()=>{
               this.AddItemMsg=null;
               this.largeModal.hide();

           },3000);
         }
     },
     err=>{
         this.AddItemMsg="Item Can't Added";
         setTimeout(()=>{
               this.AddItemMsg=null;
               this.largeModal.hide();

           },3000);
     }); 
  }

}
