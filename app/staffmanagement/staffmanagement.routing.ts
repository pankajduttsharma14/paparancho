import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffroleComponent } from './staffrole/staffrole.component';
import { StafflistComponent } from './stafflist/stafflist.component';
import {StaffmanagementComponent} from './staffmanagement.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Staff Management'
    },
    children: [
      {
        path: '',
        component: StaffroleComponent,
        data: {
          title: 'Staff Role'
        }
      },
      {
        path: 'staffrole',
        component: StaffroleComponent,
        data: {
          title: 'Staff Role'
        }
      },
      {
        path: 'stafflist',
        component: StafflistComponent,
        data: {
          title: 'Staff List'
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
export class StaffManagementRouting {}