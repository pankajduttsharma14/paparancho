import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import {TaxRoutingModule} from './taxmanagement/tax.routing';
import {OutletRoutingModule} from './outletmanagement/outlet.routing';


export const routes: Routes = [


  {
    path: '',
    redirectTo:'login',
    pathMatch: 'full'


  },
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
 },
 {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },

  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'dashboard',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },

    children: [
      {
        path: '',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'food',
        loadChildren: './food/food.module#FoodModule'
      },
      {
        path: 'staff-management',
        loadChildren: './staffmanagement/staffmanagement.module#StaffManagementModule'
      },
      {
        path: 'order',
        loadChildren: './order/order.module#OrderModule'
      },
      {
        path: 'vouchers',
        loadChildren: './vouchers/vouchers.module#VouchersModule'
      },
      {
        path: 'table-management',
        loadChildren: './tablemanagement/table.module#TableModule'
      },
      {
        path: 'tax',
        loadChildren: './taxmanagement/tax.module#TaxModule'
      },
      {
        path: 'outlet-management',
        loadChildren: './outletmanagement/outlet.module#OutletModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
