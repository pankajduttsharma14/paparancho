import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';




export const routes: Routes = [
  
  {
    path: '',
    redirectTo:'/login',
    pathMatch: 'full'

    
  },
  
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
      title: 'dashboard'
    },
    
    children: [
     
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      }
      // {
      //   path:'food',
      //   loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      // }
     
     
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
