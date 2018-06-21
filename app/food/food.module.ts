import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FoodComponent} from './food.component';
import {FoodRoutingModule} from './food.routing';
import {CategoryComponent} from '../category/category.component';
import {BrandComponent} from '../brand/brand.component';
import {ItemsComponent} from '../items/items.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FoodRoutingModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule,
    Ng2SearchPipeModule,
    
    
    

  ],
  declarations: [CategoryComponent,BrandComponent,ItemsComponent,FoodComponent]
})
export class FoodModule { }
