import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { ViewoutletsComponent } from './viewoutlets/viewoutlets.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Outlet List'
    },
    
    children: [
      {
        path: '',
        component: ViewoutletsComponent,
        data: {
          title: 'Outlets List'
        }
      },
      {
        path: 'outletlist',
        component: ViewoutletsComponent,
        data: {
          title: 'Outlets List'
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

export class OutletRoutingModule {}
