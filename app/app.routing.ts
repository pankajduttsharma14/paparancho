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
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AnonymousGuardService as HomeGuard } from './services/AnonymousGuardService';


export const routes: Routes = [


  {
    path: '',
    redirectTo:'login',
    pathMatch: 'full',
    canActivate:[HomeGuard],


  },
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate:[HomeGuard]
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
    canActivate:[AuthGuard],
    data: {
      title: ''
    },

    children: [
      {
        path: '',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivateChild:[AuthGuard]
      },
      {
        path: 'food',
        loadChildren: './food/food.module#FoodModule',
        canActivateChild:[AuthGuard]
      },
      {
        path: 'staff-management',
        loadChildren: './staffmanagement/staffmanagement.module#StaffManagementModule',
        canActivateChild:[AuthGuard]
      },
      {
        path: 'order',
        loadChildren: './order/order.module#OrderModule',
        canActivateChild:[AuthGuard]
      },
      {
        path: 'vouchers',
        loadChildren: './vouchers/vouchers.module#VouchersModule',
        canActivateChild:[AuthGuard]
      },
      {
        path: 'table-management',
        loadChildren: './tablemanagement/table.module#TableModule',
        canActivateChild:[AuthGuard]
      },
      {
        path: 'tax',
        loadChildren: './taxmanagement/tax.module#TaxModule',
        canActivateChild:[AuthGuard]
      },
      {
        path: 'outlet-management',
        loadChildren: './outletmanagement/outlet.module#OutletModule',
        canActivateChild:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers:[AuthGuard]
})
export class AppRoutingModule {}
