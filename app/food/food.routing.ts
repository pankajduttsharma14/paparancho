import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryComponent} from '../category/category.component';
import {BrandComponent} from '../brand/brand.component';
import {ItemsComponent} from '../items/items.component';
import {FoodComponent} from './food.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Food'
    },
    component:FoodComponent,
    children: [
      {
        path: '',
        component: CategoryComponent,
        data: {
          title: 'Categories'
        }
      },
        {
        path: 'categories',
        component: CategoryComponent,
        data: {
          title: 'Categories'
        }
      },
      {
        path: 'brands',
        component: BrandComponent,
        data: {
          title: 'Brands'
        }
      },
      {
        path: 'items',
        component: ItemsComponent,
        data: {
          title: 'Items'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FoodRoutingModule {}
