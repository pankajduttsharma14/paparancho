import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VouchersComponent} from './vouchers.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Vouchers List'
    },
    component:VouchersComponent,
    

  },{path: '**', redirectTo: '/404'},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VoucherRoutingModule{}