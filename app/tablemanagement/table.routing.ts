import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TablemanagementComponent} from './tablemanagement.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Table Management'
    },
    component:TablemanagementComponent,
    // children: [
    //   {
    //     path: '',
    //     component: CategoryComponent,
    //     data: {
    //       title: 'Categories'
    //     }
    //   },
    //
    //
    // ]
  }
];



@NgModule({
imports:[RouterModule.forChild(routes)],
exports:[RouterModule]


})
export class TableRoutingModule{}
