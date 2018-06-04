import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  providers: [FoodService]
})
export class BrandComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal') public largeModal1:ModalDirective;
  // formsettings
  AddBrandForm: FormGroup;
  EditForm:FormGroup;
  
  ol_id: number;
  brand_title: string;
  brand_img: string;
  status: string;
  brid:number;

  public brands: any = {};
  p: number = 1;
  constructor(private FoodService: FoodService, private router: Router, private formbuilder: FormBuilder) {
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
    this.FoodService.GetAllBrands().subscribe(res => { this.brands = res; }, err => { console.log(err) });

    // Add Form intitilized
    this.AddBrandForm = this.formbuilder.group({
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "brand_title": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "brand_img": ['', Validators.compose([Validators.required])],
      "status": ['', Validators.required]


    });
    // edit form initlization
      
    this.EditForm=this.formbuilder.group({ 
      "brid": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "brand_title": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "brand_img": ['', Validators.compose([Validators.required])],
      "status": ['', Validators.required]

    });
    


  }

  ngOnInit() {
  }
  BrandMsg: string;
  // Add brands
  AddBrand(formData) {
    let data = formData.value;
    formData.reset();
    this.FoodService.AddBrand(data).subscribe(res => {
      if (res.status == 200) {
        this.BrandMsg = res.message;
        this.FoodService.GetAllBrands().subscribe(res => { this.brands = res; }, err => { console.log(err) });
        setTimeout(() => {
          this.BrandMsg = null;
          this.largeModal.hide();

        }, 3000);
      }

      else {
        this.BrandMsg = "Can't Add Brand";
        setTimeout(() => {
          this.BrandMsg = null;
          this.largeModal.hide();

        }, 3000);
      }



    }, err => {
      this.BrandMsg = "Can't Add Brand";
      setTimeout(() => {
        this.BrandMsg = null;
        this.largeModal.hide();

      }, 3000);


    });
  }

  // Delete Brand
  DeleteBrandMsg: string;
  DeleteBrand(id) {
    this.FoodService.DeleteBrand(id).subscribe(res => {
      if (res.status == 200) {
        this.DeleteBrandMsg = res.data.message;
        this.FoodService.GetAllBrands().subscribe(res => { this.brands = res; }, err => { console.log(err) });
        setTimeout(() => {
          this.DeleteBrandMsg = null;
        }, 3000);
      }
      else {
        setTimeout(() => {
          this.DeleteBrandMsg = null;
        }, 3000);
      }
    }, err => {
      setTimeout(() => {
        this.DeleteBrandMsg = null;
      }, 3000);
    });
  }

  //edit brand
  Editrow=[];
  show(data,modal){
    this.Editrow=[];
    this.Editrow.push(data);
    console.log(this.Editrow);
    modal.show();
  }
  
  model={};
Edit()
{
  this.model={};
    this.model={
        "brid":this.Editrow[0].brid,
        "ol_id":this.Editrow[0].ol_id,
        "brand_title":this.Editrow[0].brand_title,
        "brand_img":this.Editrow[0].img_path,
        "status":this.Editrow[0].status,
    } 
}
UpdateBrandMsg:string=null;
// update brand
UpdateBrand(formData)
{ 
  let data=formData.value;
  this.FoodService.UpdateBrand(data).subscribe(res=>{
    
    if (res.status == 200) {
      this.UpdateBrandMsg = res.message;
      this.FoodService.GetAllBrands().subscribe(res => { this.brands = res; }, err => { console.log(err) });
      setTimeout(() => {
        this.UpdateBrandMsg = null;
        this.largeModal1.hide();

      }, 3000);
    }
    else{
      
      setTimeout(() => {
        this.UpdateBrandMsg = null;
        this.largeModal1.hide();

      }, 3000);
    }
  },err=>{
    
    setTimeout(() => {
      this.UpdateBrandMsg = null;
      this.largeModal1.hide();

    }, 3000);

  });
}
  
 

}
