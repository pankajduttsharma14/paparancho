import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxmamagementComponent } from './taxmamagement.component';
import { ViewtaxComponent } from './viewtax/viewtax.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tax Management'
    },
    
    children: [
      {
        path: '',
        component: ViewtaxComponent,
        data: {
          title: 'Tax List'
        }
      },
        {
        path: 'tax-list',
        component: ViewtaxComponent,
        data: {
          title: 'Tax List'
        }
      },
      
    ]
  },
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TaxRoutingModule{}