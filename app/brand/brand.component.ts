import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  providers: [FoodService, Ng4LoadingSpinnerService]
})
export class BrandComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal') public largeModal1: ModalDirective;
  @ViewChild('dangerModal') public dangerModel: ModalDirective;
  @ViewChild('fileInput') fileInput;
  // formsettings
  AddBrandForm: FormGroup;
  EditForm: FormGroup;
  searchBrand: any = '';

  ol_id: number;
  brand_title: string;
  brand_img: any;
  status: string;
  brid: number;

  public brands: any = {};
  p: number = 1;
  constructor(private FoodService: FoodService, private router: Router, private formbuilder: FormBuilder, private spinnerService: Ng4LoadingSpinnerService) {
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
    this.spinnerService.show();
    this.FoodService.GetAllBrands().subscribe(res => {
      this.brands = res;
      this.spinnerService.hide();
    }, err => {
      console.log(err);
      this.spinnerService.hide();
    });

    this.CreateAddForm();
    this.CreateEditForm();





  }
  CreateAddForm() {

    // Add Form intitilized
    this.AddBrandForm = this.formbuilder.group({
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "brand_title": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "brand_img": [null, Validators.compose([Validators.required, this.ImageTypeValidator])],
      "status": ['', Validators.required]


    });
  }
  CreateEditForm() {
    // edit form initlization


    this.EditForm = this.formbuilder.group({
      "brid": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "brand_title": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "brand_img": [null, Validators.compose([this.ImageTypeValidator])],
      "status": ['', Validators.required]

    });
  }

  ngOnInit() {}
  BrandMsg: boolean=null;

  // set brand data to local storage
  SetBrandData(res) {
    var brands = [];



    for (var i = 0; i < res.data.length; i++) {
      brands.push({ brId: res.data[i].brid, brName: res.data[i].brand_title });

    }

    localStorage.setItem('brands', JSON.stringify(brands));


  }

  // Add brands
  AddBrand() {
    this.spinnerService.show();
    let data = this.SaveAddForm();
    this.CreateAddForm();
    this.FoodService.AddBrand(data).subscribe(res => {
      console.log(res.status);
      if (res.status==200) {
        debugger;
        this.BrandMsg = res.message;
        this.FoodService.GetAllBrands().subscribe(res => { this.brands = res;
          this.SetBrandData(res);
          this.spinnerService.hide(); }, err => { console.log(err);
          this.spinnerService.hide(); });
        setTimeout(() => {
          this.BrandMsg = null;
          this.largeModal.hide();


        }, 3000);
      } else {
        this.BrandMsg = false;
        this.spinnerService.hide();
        setTimeout(() => {
          this.BrandMsg = null;
          this.largeModal.hide();

        }, 3000);
      }



    }, err => {
      this.BrandMsg = false;
      this.spinnerService.hide();
      setTimeout(() => {
        this.BrandMsg = null;
        this.largeModal.hide();


      }, 3000);


    });
  }

  // Delete Brand
  DId: any = '';
  ConfirmDialog(id, trigger: boolean = false) {
    this.DId = id;
    if (trigger == true) {

      this.DeleteBrand(this.DId);
      this.dangerModel.hide();

    } else { this.dangerModel.show(); }

  }

  DeleteBrandMsg: string;
  DeleteBrand(id) {
    this.spinnerService.show();
    this.FoodService.DeleteBrand(id).subscribe(res => {
      if (res.status == 200) {

        this.DeleteBrandMsg = res.data.message;
        this.FoodService.GetAllBrands().subscribe(res => { this.brands = res;
          this.SetBrandData(res);
          this.spinnerService.hide(); }, err => { console.log(err);
          this.spinnerService.hide(); });
        setTimeout(() => {
          this.DeleteBrandMsg = null;
        }, 3000);
      } else {
        this.spinnerService.hide();
        setTimeout(() => {
          this.DeleteBrandMsg = null;
        }, 3000);
      }
    }, err => {
      setTimeout(() => {
        this.spinnerService.hide();
        this.DeleteBrandMsg = null;
      }, 3000);
    });
  }

  //edit brand
  Editrow = [];
  show(data, modal) {
    this.Editrow = [];
    this.Editrow.push(data);
    modal.show();
  }

  model = {
    "brid": '',
    "ol_id": '',
    "brand_title": '',
    "brand_img": '',
    "status": '',
  };
  Edit($event) {
    this.model = null;
    this.model = {
      "brid": this.Editrow[0].brid,
      "ol_id": this.Editrow[0].ol_id,
      "brand_title": this.Editrow[0].brand_title,
      "brand_img": this.Editrow[0].img_path,
      "status": this.Editrow[0].status,
    }
    return this.model;
  }
  UpdateBrandMsg: string = null;
  // update brand
  UpdateBrand() {
    this.spinnerService.show();
    let data = this.SaveEditForm();
    this.CreateAddForm();
    this.FoodService.UpdateBrand(data).subscribe(res => {

      if (res.status == 200) {

        this.UpdateBrandMsg = res.message;
        this.FoodService.GetAllBrands().subscribe(res => { this.brands = res;
          this.SetBrandData(res);
          this.spinnerService.hide(); }, err => { console.log(err);
          this.spinnerService.hide(); });
        setTimeout(() => {
          this.UpdateBrandMsg = null;
          this.largeModal1.hide();

        }, 3000);

      } else {
        this.spinnerService.hide();
        setTimeout(() => {
          this.UpdateBrandMsg = null;
          this.largeModal1.hide();

        }, 3000);
      }
    }, err => {
      this.spinnerService.hide();
      setTimeout(() => {
        this.UpdateBrandMsg = null;
        this.largeModal1.hide();

      }, 3000);

    });
  }

  SelectedFile: any;
  ImageUpload(event) {
    if (event.target.files.length > 0) {
      this.SelectedFile = event.target.files[0];
    }
    console.log(this.SelectedFile);
  }


  ImageTypeValidator: any = (c: FormControl) => {


    if (!c.value) return null;

    else {
      let brand_img = c.value;
      let type = brand_img.split('.').pop();

      if (type == 'jpg' || type == 'png') {

      } else {
        return { 'ImageTypeValidator': true }
      }
    }
  }

  // save add from
  SaveAddForm() {
    let fd = new FormData();
    fd.append('ol_id', this.AddBrandForm.controls['ol_id'].value);
    fd.append('brand_title', this.AddBrandForm.controls['brand_title'].value);
    fd.append('brand_img', this.SelectedFile);
    fd.append('status', this.AddBrandForm.controls['status'].value);
    return fd;

  }

  SaveEditForm() {
    let fd = new FormData();

    fd.append('brid', this.EditForm.controls['brid'].value);
    fd.append('ol_id', this.EditForm.controls['ol_id'].value);
    fd.append('brand_title', this.EditForm.controls['brand_title'].value);
    fd.append('brand_img', this.SelectedFile);
    fd.append('status', this.EditForm.controls['status'].value);
    return fd;

  }


}
