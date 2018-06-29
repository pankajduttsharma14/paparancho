import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableRoutingModule} from './table.routing';
import {TablemanagementComponent} from './tablemanagement.component';
import { ViewTablesComponent } from './view-tables/view-tables.component';


import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
imports:[CommonModule,NgxPaginationModule,FormsModule,ReactiveFormsModule,TableRoutingModule,ModalModule,Ng4LoadingSpinnerModule,BsDropdownModule],
declarations:[TablemanagementComponent, ViewTablesComponent ]
})

export class TableModule { }
