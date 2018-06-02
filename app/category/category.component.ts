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

  p: number = 1;
  private AddCat = {};
  public categories: any = [];
  private AddForm: any;

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
public category_type:string[]=['FOOD', 'DRINK']; 
public Status:string[]=['Active', 'Inactive']; 
public alchoholic:any=[{'value':true,'data':'Yes'},{'value':false,'data':'No'}]; 
urlPattern=/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

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
      'cat_img_url': ['', [Validators.required,Validators.pattern(this.urlPattern)]],
      'isAlcholic': ['', Validators.required],
      'status': ['', Validators.required],
});

    // get all .categories
    this.FoodService.GetAllCategories().subscribe(res => {this.categories = res.data;},
      err => { console.log(err) }, );}


  ngOnInit() { }
  // add categories

  AddCatMsg:string=null;
  AddCategories(formData) {
    let data=formData.value;      
    if(data)
    { formData.reset();
      this.FoodService.AddCategory(data).subscribe(
        res=>{
        if(res.status==200)
        {
          console.log(res);
          this.AddCatMsg=res.message;
          // get all .categories
          this.FoodService.GetAllCategories().subscribe(res => {this.categories = res.data;},
          err => { console.log(err) }, );
            setTimeout(()=>{
              this.AddCatMsg=null;
               this.largeModal.hide();
            },3000);

        }
        else{
          this.AddCatMsg="Category can't added";
        }
      },
        err=>{
          this.AddCatMsg="Category can't added";
        }
      );
    }

  }



}
