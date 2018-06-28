import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TablemanagementComponent} from './tablemanagement.component';
import { ViewTablesComponent } from './view-tables/view-tables.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Table Management'
    },
    component:ViewTablesComponent,
    children: [
      {
        path: '',
        component: ViewTablesComponent,
        data: {
          title: 'View Tables'
        }
      },
      {
        path: 'view-tables',
        component: ViewTablesComponent,
        data: {
          title: 'View Tables'
        }
      }
     
    ]
  },
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})



@NgModule({
imports:[RouterModule.forChild(routes)],
exports:[RouterModule]


})
export class TableRoutingModule{}
