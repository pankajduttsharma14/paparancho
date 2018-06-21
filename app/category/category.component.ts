import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs/Rx';





@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [FoodService, Ng4LoadingSpinnerService],

})
export class CategoryComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  @ViewChild('dangerModal') public dangerModel: ModalDirective;
  @ViewChild('fileInput') fileInput;



  p: number = 1;
  private AddCat = {};
  public categories: any = [];
  AddForm: any;
  EditForm: any;
  searchCat: any = '';

  // parameters for form
  ol_id: string;
  cat_type: string;
  parent_id: string;
  cat_title: string
  cat_img_name: string;
  cat_img_url: any;
  isAlcoholic: boolean;
  status: string;

  // fill dropdown
  public category_type: string[] = ['FOOD', 'DRINK'];
  public Status: string[] = ['Active', 'Inactive'];
  public alchoholic: any = [{ 'value': true, 'data': 'Yes' }, { 'value': false, 'data': 'No' }];
  urlPattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

  constructor(private FoodService: FoodService,
    private router: Router,
    private fb: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    
    

  ) {

    var status = localStorage.getItem('loginStatus');
    if (status != "true") {

      this.router.navigate(['login']);

    }
    
  


    this.spinnerService.show();
    // get all .categories
    this.FoodService.GetAllCategories().subscribe(res => {
        this.categories = res.data;
        this.spinnerService.hide();
      },
      err => {
        console.log(err);
        this.spinnerService.hide();
      });
    this.CreateAddForm();
    this.CreateEditForm();
  }
  
  CreateAddForm() {
    // form settings
    this.AddForm = this.fb.group({
      'ol_id': ['', Validators.required],
      'cat_type': ['', Validators.required],
      'parent_id': ['', Validators.required],
      'cat_title': ['', Validators.required],
      'cat_img_name': ['', Validators.required],
      // 'cat_img_url': ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      'cat_img_url': [null, Validators.compose([Validators.required, this.ImageTypeValidator])],
      'isAlcoholic': ['', Validators.required],
      'status': ['', Validators.required],
    });
  }


  CreateEditForm() {
    this.EditForm = this.fb.group({
      'icid': ['', ],
      'ol_id': ['', Validators.required],
      'cat_type': ['', Validators.required],
      'parent_id': ['', Validators.required],
      'cat_title': ['', Validators.required],
      'cat_img_name': ['', Validators.required],
      // 'cat_img_url': ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      'cat_img_url': [null, Validators.compose([this.ImageTypeValidator])],
      'isAlcoholic': ['', Validators.required],
      'status': ['', Validators.required],

    });
  }
 
  ngOnInit() {
    

  }

  // set categorydata
  SetCatData(res) {
    
    var categories = [];
    console.log(res);

    for (var i = 0; i < res.data.length; i++) {
      categories.push({ catId: res.data[i].icid, catName: res.data[i].cat_title });

    }

    localStorage.setItem('categories', JSON.stringify(categories));



  }


  // add categories
  AddCatMsg: string = null;
  AddCategories() {

    this.spinnerService.show();
    let data: any = this.SaveData();
    this.CreateAddForm();

    if (data) {
      // formData.reset();
      this.FoodService.AddCategory(data).subscribe(
        res => {

          if (res.status == 200) {

            this.AddCatMsg = res.message;

            // get all .categories
            this.FoodService.GetAllCategories().subscribe(res => {
                this.categories = res.data;
                this.SetCatData(res);
                this.spinnerService.hide();
              },
              err => { this.spinnerService.hide(); }, );
            setTimeout(() => {
              this.AddCatMsg = null;
              this.largeModal.hide();
            }, 3000);

          } else {
            this.AddCatMsg = "Category can't added";
            this.spinnerService.hide();
            setTimeout(() => {
              this.AddCatMsg = null;
              this.largeModal.hide();
            }, 3000);

          }
        },
        err => {
          this.AddCatMsg = "Category can't added";
          this.spinnerService.hide();
          setTimeout(() => {
            this.AddCatMsg = null;
            this.largeModal.hide();
          }, 3000);
        }
      );
    }

  }
  // delete category
  catId: any = '';
  ConfirmDialog(id, trigger: boolean = false) {
    this.catId = id;
    if (trigger == true) {

      this.DeleteCategory(this.catId);
      this.dangerModel.hide();

    } else { this.dangerModel.show(); }

  }

  DeleteCatMsg: string = null;
  DeleteCategory(id) {
    this.spinnerService.show();
    this.FoodService.DeleteCategory(id).subscribe(res => {
      if (res.status == 200) {

        this.spinnerService.hide();

        this.DeleteCatMsg = 'Item Deleted Successfully';

        this.FoodService.GetAllCategories().subscribe(res => {
            this.categories = res.data;
            this.SetCatData(res);

          },
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

    this.Editrow = new Array();
    this.Editrow.push(data);

    modal.show();
  }

  model = {
    'icid': '',
    'ol_id': '',
    'cat_type': '',
    'parent_id': '',
    'cat_title': '',
    'cat_img_name': '',
    'cat_img_url': '',
    'status': '',
    'isAlcoholic': '',
  }
  Edit($event = 0) {

    this.model = null;
    this.model = {
      'icid': this.Editrow[0].icid,
      'ol_id': this.Editrow[0].ol_id,
      'cat_type': this.Editrow[0].cat_type,
      'parent_id': this.Editrow[0].parent_id,
      'cat_title': this.Editrow[0].cat_title,
      'cat_img_name': this.Editrow[0].cat_img_name,
      'cat_img_url': this.Editrow[0].cat_img_url,
      'status': this.Editrow[0].status,
      'isAlcoholic': this.Editrow[0].isAlcoholic

    }

  }
  UpdateCatMsg: string = null;
  UpdateCategory(formData) {
    this.spinnerService.show();
    let data: any = this.SaveEditData();
    this.CreateEditForm();
    this.FoodService.UpdateCategory(data).subscribe(res => {

      if (res.status == 200) {

        this.spinnerService.hide();

        this.UpdateCatMsg = res.message;
        this.FoodService.GetAllCategories().subscribe(res => {
          this.categories = res.data;
          this.SetCatData(res);
        }, err => { console.log(err) });
        setTimeout(() => {
          this.UpdateCatMsg = null;
          this.largeModal1.hide();

        }, 3000);


      } else {

        setTimeout(() => {
          this.UpdateCatMsg = null;
          this.largeModal1.hide();

        }, 3000);
      }
    }, err => {

      setTimeout(() => {
        this.UpdateCatMsg = null;
        this.largeModal1.hide();

      }, 3000);

    });
  }

  // dropdown category
  AlStatus: any = null;

  SetAlcholic(value) {

    if (value.toLowerCase() == 'food') {

      this.AlStatus = true;

    } else {

      this.AlStatus = null;

    }
  }

  SelectedFile: any;
  fileName: any;
  onFileChange(event) {
    // this.resetFile();
    if (event.target.files.length > 0) {
      this.SelectedFile = event.target.files[0];
    }
  }


  // save form data
  SaveData(): any {




    let data = new FormData();
    data.append('ol_id', this.AddForm.controls['ol_id'].value);
    data.append('cat_type', this.AddForm.controls['cat_type'].value);
    data.append('parent_id', this.AddForm.controls['parent_id'].value);
    data.append('cat_title', this.AddForm.controls['cat_title'].value);
    data.append('cat_img_name', this.AddForm.controls['cat_img_name'].value);
    // data.append('cat_img_url', this.SelectedFile, this.SelectedFile.name);
    data.append('cat_img_url', this.SelectedFile);
    data.append('isAlcoholic', this.AddForm.controls['isAlcoholic'].value);
    data.append('status', this.AddForm.controls['status'].value);
    return data;



  }

  SaveEditData(): any

  {
    let data = new FormData();
    data.append('icid', this.EditForm.controls['icid'].value);
    data.append('ol_id', this.EditForm.controls['ol_id'].value);
    data.append('cat_type', this.EditForm.controls['cat_type'].value);
    data.append('parent_id', this.EditForm.controls['parent_id'].value);
    data.append('cat_title', this.EditForm.controls['cat_title'].value);
    data.append('cat_img_name', this.EditForm.controls['cat_img_name'].value);
    data.append('cat_img_url', this.SelectedFile, this.SelectedFile.name);
    data.append('isAlcoholic', this.EditForm.controls['isAlcoholic'].value);
    data.append('status', this.EditForm.controls['status'].value);
    return data;
  }
  // image type validator

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
  resetFile() { this.fileInput.nativeElement.value = ""; }


}
