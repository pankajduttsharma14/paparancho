import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Observer } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  providers: [FoodService]
})
export class ItemsComponent implements OnInit {
  @ViewChild('largeModal')  public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  @ViewChild('dangerModal') public dangerModel: ModalDirective;
  @ViewChild('fileInput1') fileInput:any;

  p: number = 1;
  public items: any = [];
  AddItemsForm: FormGroup;
  EditForm: FormGroup;
  searchItem: any = '';
  // form settings
  ol_id: number;
  icid: string;
  item_cat_type: string;
  // brand_id: string;
  item_title: string;
  item_price: number;
  min_bar_price: number;
  max_bar_price: number;
  item_img_url: string|any;
  item_img_name: string;
  item_stock: number;
  status: string;

  GetAllitems()
  {
  this.spinnerService.show();
  this.FoodService.GetAllItems().subscribe(res => {
  this.items = res.data;
      
  this.spinnerService.hide();
    }, err => { this.spinnerService.hide(); });
  }

  constructor(private FoodService: FoodService, private router: Router, private FormBuilder: FormBuilder, private spinnerService: Ng4LoadingSpinnerService) {
    this.GetAllitems();
    this.CreateEditForm();
    this.CreateAddForm();
  }
  
//   ItemFilterData(data):any
//   {
//       var item_data=new Array();
//         for(var i=0;i<data.length;i++)
//         {
//           item_data.push({itmid:data[i].itmid,item_title:data[i].item_title,item_stock:data[i].item_stock,item_price:data[i].item_price,min_bar_price:data[i].min_bar_price,max_bar_price:data[i].max_bar_price,item_img_url:data[i].item_img_url,});
//         }
//         return item_data;
// }


  CreateAddForm(): void {
    // form initilization
    this.AddItemsForm = this.FormBuilder.group({


      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      'icid': ['', Validators.compose([Validators.required])],
      'item_cat_type': [''],
      // 'brand_id': ['', Validators.compose([Validators.required])],
      'item_title': ['', Validators.compose([Validators.required])],
      'item_price': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'min_bar_price': ['', Validators.compose([Validators.required, Validators.min(1), this.PriceValidator])],
      'max_bar_price': ['', Validators.compose([Validators.required, Validators.min(1), this.PriceValidator])],
      'item_img_url': ['', Validators.compose([Validators.required,this.ImageTypeValidator ])],
      'item_img_name': ['', Validators.compose([Validators.required, ])],
      'item_stock': ['', Validators.compose([Validators.required, ])],
      'status': ['', Validators.compose([Validators.required, ])],


    }, {
      validator: this.PriceValidator // your validation method
    });
  }



  CreateEditForm(): void {

    this.EditForm = this.FormBuilder.group({

      'itmid': [''],
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      'icid': ['',Validators.required],
      'item_cat_type': [''],
      // 'brand_id': ['', Validators.compose([Validators.required, ])],
      'item_title': ['', Validators.compose([Validators.required, ])],
      'item_price': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'min_bar_price': ['', Validators.compose([Validators.required, Validators.min(1), this.PriceValidator])],
      'max_bar_price': ['', Validators.compose([Validators.required, Validators.min(1), this.PriceValidator])],
      'item_img_url': ['',Validators.compose([this.ImageTypeValidator])],
      'item_img_name': ['', Validators.compose([Validators.required, ])],
      'item_stock': ['', Validators.compose([Validators.required, ])],
      'status': ['', Validators.compose([Validators.required, ])]
    },{
      validator: this.PriceValidator // your validation method
    });
  }


  // vars
  catList = [];
  brandList = {};
  AddItemMsg: string = null;
  ngOnInit() {
    

    this.FoodService.GetAllCategories().subscribe(res=>{

        if(res.status==200)
        {
          for(var i=0;i<res.data.length;i++)
          {
              if(res.data[i].status=='ACTIVE')
              {
                this.catList.push(res.data[i]);
              }
          }

        }
    },err=>{

      return;
    })
    
   
}
  
  // bar price custom validator


  PriceValidator: any = (c: FormControl) => {

    if (c.get('max_bar_price') != null || c.get('min_bar_price') != null) {

      let max = c.get('max_bar_price').value;
      
      let min = c.get('min_bar_price').value;
      
      if (min >= max) {

        c.get('max_bar_price').setErrors({ PriceValidator: true });

      } else {
        return null;
      }






    } else {
      return null;
    }






  }


  GetCatType: any = '';
  // add item
  GetCategoryType: any = (id) => {
    this.spinnerService.show();
    let CatType: any = '';
    this.FoodService.GetCategoryType(id).subscribe(res => {
      if (res.status == 200) {

        this.spinnerService.hide();
        this.GetCatType = res.data[0].cat_type;



      } else {
        this.spinnerService.hide();
        return false;
      }

    }, err => {

      this.spinnerService.hide();
      return false;

    });




  }





  AddItems() {


    this.spinnerService.show();
    let data = this.SaveAddForm();;
    this.CreateAddForm();
    this.FoodService.AddItem(data).subscribe(res => {
        if (res.status == 200) {
          this.AddItemMsg = res.message;
          this.FoodService.GetAllItems().subscribe(res => {
            this.items = res.data;
            this.spinnerService.hide();
          }, err => { this.spinnerService.hide(); });
          setTimeout(() => {
            this.AddItemMsg = null;
            this.largeModal.hide();

          }, 3000);
        } else {
          this.spinnerService.hide();
          this.AddItemMsg = "Item Can't Added";
          setTimeout(() => {
            this.AddItemMsg = null;
            this.largeModal.hide();

          }, 3000);
        }
      },
      err => {
        this.spinnerService.hide();
        this.AddItemMsg = "Item Can't Added";
        setTimeout(() => {
          this.AddItemMsg = null;
          this.largeModal.hide();

        }, 3000);
      });
  }



  DeleteItemMsg: string = null;
  // Delete item
  itemId: any = '';
  ConfirmDialog(id, trigger: boolean = false) {
    this.itemId = id;
    if (trigger == true) {

      this.DeleteItem(this.itemId);
      this.dangerModel.hide();

    } else { this.dangerModel.show(); }

  }


  DeleteItem(id) {
    this.spinnerService.show();
    this.FoodService.DeleteItem(id).subscribe(res => {
        if (res.status == 200) {
          this.DeleteItemMsg = "Item Deleted Successfully";
          this.FoodService.GetAllItems().subscribe(res => {
              if (res.status == 200) {
                this.items = res.data;
              }
              this.spinnerService.hide();
            },
            err => { this.spinnerService.hide(); });
          setTimeout(() => {
            this.DeleteItemMsg = null;
          }, 3000);
        } else {

          this.DeleteItemMsg = "Item Can't Deleted";
          this.spinnerService.hide();
          setTimeout(() => {
            this.DeleteItemMsg = null;
          }, 3000);
        }
      },
      err => {
        this.DeleteItemMsg = "Item Can't Deleted";
        this.spinnerService.hide();
        setTimeout(() => {
          this.DeleteItemMsg = null;
        }, 3000);
      });

  }

  // edit Items
  Editrow = [];
  show(data, modal) {

    this.GetCategoryType(data.icid);
    this.Editrow = Array();
    this.Editrow.push(data);
    this.resetFile();

    modal.show();
  }

  model = {
    "itmid": '',
    'item_cat_type': '',
    "ol_id": '',
    "icid": '',
    // "brand_id": '',
    "item_title": '',
    "item_price": '',
    "min_bar_price": '',
    "max_bar_price": '',
    "item_img_url": '',
    "item_img_name": '',
    "item_stock": '',
    "status": ''

  }
  Edit($event) {
    this.model = null;
    this.model = {

      "itmid": this.Editrow[0].itmid,
      "ol_id": this.Editrow[0].ol_id,
      "icid": this.Editrow[0].icid,
      'item_cat_type': this.Editrow[0].item_cat_type,
      // "brand_id": this.Editrow[0].brand_id,
      "item_title": this.Editrow[0].item_title,
      "item_price": this.Editrow[0].item_price,
      "min_bar_price": this.Editrow[0].min_bar_price,
      "max_bar_price": this.Editrow[0].max_bar_price,
      "item_img_url": '',
      "item_img_name": this.Editrow[0].item_img_name,
      "item_stock": this.Editrow[0].item_stock,
      "status": this.Editrow[0].status,
    }

  }
  ItemEditMsg: string = null;
  EditItem() {

    this.spinnerService.show();
    let data = this.SaveEditForm();
    this.CreateEditForm();
    this.FoodService.UpdateItem(data).subscribe(res => {
      if (res.status == 200) {
        this.FoodService.GetAllItems().subscribe(res => {
          this.items = res.data;
          this.spinnerService.hide();
        }, err => { this.spinnerService.hide(); });
        this.ItemEditMsg = res.message;
        setTimeout(() => {
          this.ItemEditMsg = null;
          this.largeModal1.hide();
        }, 3000);

      } else {

        this.ItemEditMsg = 'Items Can not updated';
        this.spinnerService.hide();
        setTimeout(() => {
          this.ItemEditMsg = null;
          this.largeModal1.hide();
        }, 3000);
      }

    }, err => {

      this.ItemEditMsg = 'Items Can not updated';
      this.spinnerService.hide();
      setTimeout(() => {
        this.ItemEditMsg = null;
        this.largeModal1.hide();
      }, 3000);
    });


  }

  ImageTypeValidator: any = (c: FormControl) => {


    if (!c.value) return null;

    else {
      let cat_img_url = c.value;
      let type = cat_img_url.split('.').pop();

      if (type == 'jpg' || type == 'png') {

      } else {

        return { 'ImageTypeValidator': true }
      }
    }


  }
  ShowModelAdd() {
    
    this.CreateAddForm();
    this.largeModal.show();
  }
  SelectedFile:any;
  ImageUpload(event){
       if (event.target.files.length > 0) {
      this.SelectedFile = event.target.files[0];
    }
  }  
  SaveAddForm()
  {

   
    let fd=new FormData();
    fd.append('ol_id',this.AddItemsForm.controls['ol_id'].value);
    fd.append('icid',this.AddItemsForm.controls['icid'].value);
    fd.append('item_cat_type',this.AddItemsForm.controls['item_cat_type'].value);
    // fd.append('brand_id',this.AddItemsForm.controls['brand_id'].value);
    fd.append('item_title',this.AddItemsForm.controls['item_title'].value);
    fd.append('item_price',this.AddItemsForm.controls['item_price'].value);
    fd.append('min_bar_price',this.AddItemsForm.controls['min_bar_price'].value);
    fd.append('max_bar_price',this.AddItemsForm.controls['max_bar_price'].value);
    fd.append('item_img_url',this.SelectedFile);
    fd.append('item_img_name',this.AddItemsForm.controls['item_img_name'].value);
    fd.append('item_stock',this.AddItemsForm.controls['item_stock'].value);
    fd.append('status',this.AddItemsForm.controls['status'].value);
    return fd;
  }
  SaveEditForm()
  {

   
    let fd=new FormData();
    
    fd.append('itmid',this.EditForm.controls['itmid'].value);
    fd.append('ol_id',this.EditForm.controls['ol_id'].value);
    fd.append('icid',this.EditForm.controls['icid'].value);
    fd.append('item_cat_type',this.EditForm.controls['item_cat_type'].value);
    // fd.append('brand_id',this.EditForm.controls['brand_id'].value);
    fd.append('item_title',this.EditForm.controls['item_title'].value);
    fd.append('item_price',this.EditForm.controls['item_price'].value);
    fd.append('min_bar_price',this.EditForm.controls['min_bar_price'].value);
    fd.append('max_bar_price',this.EditForm.controls['max_bar_price'].value);
    fd.append('item_img_url',this.SelectedFile);
    fd.append('item_img_name',this.EditForm.controls['item_img_name'].value);
    fd.append('item_stock',this.EditForm.controls['item_stock'].value);
    fd.append('status',this.EditForm.controls['status'].value);
    return fd;
  }
  resetFile() {
   this.fileInput.nativeElement.value = "";

 }

  
  ImageUrl:any;
  Enlarge:boolean=false;
  
  ScaleImg(url, event){
      document.body.classList.add('OverFlowHidden');
      if(!url || url=='') return;
      else{

      this.ImageUrl=url;
      this.Enlarge=true;
      }

  }

  HideImage(event)
  {
    document.body.classList.remove('OverFlowHidden');
    this.Enlarge=false;
  }
}
