import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportsComponent} from './reports.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports'
    },
    component:ReportsComponent,
    

  },{path: '**', redirectTo: '/404'},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportsRoutingModule{}