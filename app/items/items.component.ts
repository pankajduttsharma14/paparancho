import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  providers: [FoodService]
})
export class ItemsComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  p: number = 1;
  public items: any = {};
  AddItemsForm: FormGroup;
  EditForm: FormGroup;
  // form settings
  ol_id: number;
  icid: string;
  brand_id: string;
  item_title: string;
  item_price: number;
  min_bar_price: number;
  max_bar_price: number;
  item_img_url: string;
  item_img_name: string;
  item_stock: number;
  status: string;

  constructor(private FoodService: FoodService, private router: Router, private FormBuilder: FormBuilder) {
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
    this.FoodService.GetAllItems().subscribe(res => { this.items = res; }, err => {});

    // form initilization
    this.AddItemsForm = this.FormBuilder.group({

      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      'icid': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'brand_id': ['', Validators.compose([Validators.required, ])],
      'item_title': ['', Validators.compose([Validators.required, ])],
      'item_price': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'min_bar_price': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'max_bar_price': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'item_img_url': ['', Validators.compose([Validators.required, ])],
      'item_img_name': ['', Validators.compose([Validators.required, ])],
      'item_stock': ['', Validators.compose([Validators.required, ])],
      'status': ['', Validators.compose([Validators.required, ])],


    });

    this.EditForm = this.FormBuilder.group({

      'itmid': [''],
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      'brand_id': ['', Validators.compose([Validators.required, ])],
      'item_title': ['', Validators.compose([Validators.required, ])],
      'item_price': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'min_bar_price': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'max_bar_price': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'item_img_url': ['', Validators.compose([Validators.required, ])],
      'item_img_name': ['', Validators.compose([Validators.required, ])],
      'item_stock': ['', Validators.compose([Validators.required, ])],
      'status': ['', Validators.compose([Validators.required, ])],


    });



  }
  // vars
  catList = {};
  brandList = {};
  AddItemMsg: string = null;
  ngOnInit() {
    this.catList = JSON.parse(localStorage.getItem('categories'));
    this.brandList = JSON.parse(localStorage.getItem('brands'));



  }

  // add item
  AddItems(formData) {
    let data = formData.value;
    formData.reset();

    this.FoodService.AddItem(data).subscribe(res => {
        if (res.status == 200) {
          this.AddItemMsg = res.message;
          this.FoodService.GetAllItems().subscribe(res => { this.items = res; }, err => {});
          setTimeout(() => {
            this.AddItemMsg = null;
            this.largeModal.hide();

          }, 3000);
        } else {

          this.AddItemMsg = "Item Can't Added";
          setTimeout(() => {
            this.AddItemMsg = null;
            this.largeModal.hide();

          }, 3000);
        }
      },
      err => {
        this.AddItemMsg = "Item Can't Added";
        setTimeout(() => {
          this.AddItemMsg = null;
          this.largeModal.hide();

        }, 3000);
      });
  }
  DeleteItemMsg: string = null;
  // Delete item
  DeleteItem(id) {
    this.FoodService.DeleteItem(id).subscribe(res => {
        if (res.status == 200) {
          this.DeleteItemMsg = "Item Deleted Successfully";
          this.FoodService.GetAllItems().subscribe(res => { this.items = res; }, err => {});
          setTimeout(() => {
            this.DeleteItemMsg = null;
          }, 3000);
        } else {
          this.DeleteItemMsg = "Item Can't Deleted";
          setTimeout(() => {
            this.DeleteItemMsg = null;
          }, 3000);
        }
      },
      err => {
        this.DeleteItemMsg = "Item Can't Deleted";
        setTimeout(() => {
          this.DeleteItemMsg = null;
        }, 3000);
      });

  }

  // edit Items
  Editrow = [];
  show(data, modal) {

    this.Editrow = Array();
    this.Editrow.push(data);

    modal.show();
  }

  model = {
    "itmid": '',
    "ol_id": '',
    "icid": '',
    "brand_id": '',
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
      "brand_id": this.Editrow[0].brand_id,
      "item_title": this.Editrow[0].item_title,
      "item_price": this.Editrow[0].item_price,
      "min_bar_price": this.Editrow[0].min_bar_price,
      "max_bar_price": this.Editrow[0].max_bar_price,
      "item_img_url": this.Editrow[0].item_img_url,
      "item_img_name": this.Editrow[0].item_img_name,
      "item_stock": this.Editrow[0].item_stock,
      "status": this.Editrow[0].status,
    }

  }
  ItemEditMsg: string = null;
    EditItem(formData) {
    let data = formData.value;
    this.FoodService.UpdateItem(data).subscribe(res => {
      if (res.status == 200) {
         this.FoodService.GetAllItems().subscribe(res => { this.items = res; }, err => {});
        this.ItemEditMsg = res.message;
        setTimeout(() => {
          this.ItemEditMsg = null;
          this.largeModal1.hide();
        }, 3000);

      } else {

        this.ItemEditMsg = 'Items Can not updated';
        setTimeout(() => {
          this.ItemEditMsg = null;
          this.largeModal1.hide();
        }, 3000);
      }

    }, err => {

      this.ItemEditMsg = 'Items Can not updated';
      setTimeout(() => {
        this.ItemEditMsg = null;
        this.largeModal1.hide();
      }, 3000);
    });


  }


}
