import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [FoodService]
})
export class CategoryComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;

  p: number = 1;
  private AddCat = {};
  public categories: any = [];
  AddForm: any;
  EditForm: FormGroup;

  // parameters for form
  ol_id: string;
  cat_type: string;
  parent_id: string;
  cat_title: string
  cat_img_name: string;
  cat_img_url: string;
  isAlcholic: boolean;
  status: string;

  // fill dropdown
  public category_type: string[] = ['FOOD', 'DRINK'];
  public Status: string[] = ['Active', 'Inactive'];
  public alchoholic: any = [{ 'value': true, 'data': 'Yes' }, { 'value': false, 'data': 'No' }];
  urlPattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

  constructor(private FoodService: FoodService,
    private router: Router,
    private fb: FormBuilder

  ) {

    var status = localStorage.getItem('loginStatus');
    if (status != "true") {

      this.router.navigate(['login']);

    }
    // form settings
    this.AddForm = this.fb.group({
      'ol_id': ['', Validators.required],
      'cat_type': ['', Validators.required],
      'parent_id': ['', Validators.required],
      'cat_title': ['', Validators.required],
      'cat_img_name': ['', Validators.required],
      'cat_img_url': ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      'isAlcholic': ['', Validators.required],
      'status': ['', Validators.required],
    });
    this.EditForm = this.fb.group({
      'icid':['',],
      'ol_id': ['', Validators.required],
      'cat_type': ['', Validators.required],
      'parent_id': ['', Validators.required],
      'cat_title': ['', Validators.required],
      'cat_img_name': ['', Validators.required],
      'cat_img_url': ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      'isAlcoholic': ['', Validators.required],
      'status': ['', Validators.required],

    });

    // get all .categories
    this.FoodService.GetAllCategories().subscribe(res => { this.categories = res.data; },
      err => { console.log(err) }, );
  }


  ngOnInit() {}
  // add categories

  AddCatMsg: string = null;
  AddCategories(formData) {
    let data = formData.value;
    if (data) {
      formData.reset();
      this.FoodService.AddCategory(data).subscribe(
        res => {
          if (res.status == 200) {
            console.log(res);
            this.AddCatMsg = res.message;
            // get all .categories
            this.FoodService.GetAllCategories().subscribe(res => { this.categories = res.data; },
              err => { console.log(err) }, );
            setTimeout(() => {
              this.AddCatMsg = null;
              this.largeModal.hide();
            }, 3000);

          } else {
            this.AddCatMsg = "Category can't added";
          }
        },
        err => {
          this.AddCatMsg = "Category can't added";
        }
      );
    }

  }
  // delete category

  DeleteCatMsg: any=null;
  DeleteCategory(id) {
    this.FoodService.DeleteCategory(id).subscribe(res => {
      if (res.status == 200) {
        this.DeleteCatMsg = 'Item Deleted Successfully';
        this.FoodService.GetAllCategories().subscribe(res => { this.categories = res.data; },
          err => { console.log(err) });

        setTimeout(() => {
          this.DeleteCatMsg = null;
        }, 3000);
      } else {
        setTimeout(() => {
          this.DeleteCatMsg = null;
        }, 3000);
      }
    }, err => {
      setTimeout(() => {
        this.DeleteCatMsg = null;
      }, 3000);
    });
  }

  // Edit Category

  Editrow = [];
  show(data, modal) {

    this.Editrow = Array();
    this.Editrow.push(data);
    console.log(this.Editrow);
    modal.show();
  }

  model = {
  'icid':'',
  'ol_id': '',
  'cat_type':'',
  'parent_id':'',
  'cat_title': '',
  'cat_img_name':'',
  'cat_img_url': '',
  'status': '',
  'isAlcoholic': '',
  }
  Edit($event) {
    
    this.model = null;
    this.model = {
      'icid':this.Editrow[0].icid,
      'ol_id': this.Editrow[0].ol_id,
      'cat_type': this.Editrow[0].cat_type,
      'parent_id': this.Editrow[0].parent_id,
      'cat_title': this.Editrow[0].cat_title,
      'cat_img_name': this.Editrow[0].cat_img_name,
      'cat_img_url': this.Editrow[0].cat_img_url,
      'status': this.Editrow[0].status,
      'isAlcoholic': this.Editrow[0].isAlcoholic,

    }

  }
  UpdateCatMsg:string=null;
  UpdateCategory(formData)
  {
     let data=formData.value;
     console.log(data);
     this.FoodService.UpdateCategory(data).subscribe(res=>{

      if (res.status == 200) {
      this.UpdateCatMsg = res.message;
      this.FoodService.GetAllCategories().subscribe(res => { this.categories = res; }, err => { console.log(err) });
      setTimeout(() => {
        this.UpdateCatMsg = null;
        this.largeModal1.hide();

      }, 3000);
    }
    else{
      
      setTimeout(() => {
        this.UpdateCatMsg = null;
        this.largeModal1.hide();

      }, 3000);
    }
  },err=>{
    
    setTimeout(() => {
      this.UpdateCatMsg = null;
      this.largeModal1.hide();

    }, 3000);

  });  
  }





}
