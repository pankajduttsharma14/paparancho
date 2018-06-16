import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [FoodService, Ng4LoadingSpinnerService]
})
export class CategoryComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  @ViewChild('dangerModal') public dangerModel: ModalDirective;

  p: number = 1;
  private AddCat = {};
  public categories: any = [];
  AddForm: any;
  EditForm: FormGroup;
  searchCat:any='';

  // parameters for form
  ol_id: string;
  cat_type: string;
  parent_id: string;
  cat_title: string
  cat_img_name: string;
  cat_img_url: string;
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
    private spinnerService: Ng4LoadingSpinnerService

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
      'isAlcoholic': ['', Validators.required],
      'status': ['', Validators.required],
    });
    this.EditForm = this.fb.group({
      'icid': ['', ],
      'ol_id': ['', Validators.required],
      'cat_type': ['', Validators.required],
      'parent_id': ['', Validators.required],
      'cat_title': ['', Validators.required],
      'cat_img_name': ['', Validators.required],
      'cat_img_url': ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      'isAlcoholic': ['', Validators.required],
      'status': ['', Validators.required],

    });
    this.spinnerService.show(); 
    // get all .categories
    this.FoodService.GetAllCategories().subscribe(res => { this.categories = res.data; this.spinnerService.hide();},
      err => { console.log(err);this.spinnerService.hide();});
  }


  ngOnInit() {}
  
// set categorydata
  SetCatData(res)
  {
    var categories=[];
      console.log(res);
    
        for(var i=0; i<res.data.length;i++)
        {  
         categories.push({catId:res.data[i].icid,catName:res.data[i].cat_title});
          
        }

        localStorage.setItem('categories',JSON.stringify(categories));

      
    
  }


  // add categories
AddCatMsg: string = null;
  AddCategories(formData) {

    this.spinnerService.show();
    let data = formData.value;
    if (data) {
      formData.reset();
      this.FoodService.AddCategory(data).subscribe(
        res => {
          
          if (res.status == 200) {
          
            this.AddCatMsg = res.message;
            
            // get all .categories
            this.FoodService.GetAllCategories().subscribe(res => { this.categories = res.data; 
              this.SetCatData(res);
              this.spinnerService.hide();
            },
              err => {this.spinnerService.hide();},);
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
catId:any='';
    ConfirmDialog(id, trigger:boolean=false)
  {
    this.catId=id;
    if(trigger==true)
    {
      
      this.DeleteCategory(this.catId);  
      this.dangerModel.hide();

    }
    else{this.dangerModel.show();}
    
  }

  DeleteCatMsg: string = null;
  DeleteCategory(id) {
    this.spinnerService.show();
    this.FoodService.DeleteCategory(id).subscribe(res => {
      if (res.status == 200) {

        this.spinnerService.hide();
        
        this.DeleteCatMsg = 'Item Deleted Successfully';

        this.FoodService.GetAllCategories().subscribe(res => { this.categories = res.data; 
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
  Edit($event=0) {

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
    let data = formData.value;

    this.FoodService.UpdateCategory(data).subscribe(res => {
      
      if (res.status == 200) {

        this.spinnerService.hide();
        
        this.UpdateCatMsg = res.message;
        this.FoodService.GetAllCategories().subscribe(res => { this.categories = res.data; this.SetCatData(res); }, err => { console.log(err)});
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
  AlStatus:any=null;
  
  SetAlcholic(value)
  { 
    
    if(value.toLowerCase()=='food')
    {
       
       this.AlStatus=true;
       
    }
    else{
      
     this.AlStatus=null;
     
    }
  }

}