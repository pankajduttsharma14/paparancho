import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffroleComponent } from './staffrole/staffrole.component';
import { StaffManagementRouting } from './staffmanagement.routing';
import { StafflistComponent } from './stafflist/stafflist.component';
import { StaffmanagementComponent } from './staffmanagement.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
 imports: [CommonModule,StaffManagementRouting,FormsModule ,ReactiveFormsModule,ModalModule,NgxPaginationModule],
 declarations: [StaffroleComponent, StafflistComponent, StaffmanagementComponent]


})
export class StaffManagementModule {}
