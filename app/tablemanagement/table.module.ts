import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableRoutingModule} from './table.routing';
import {TablemanagementComponent} from './tablemanagement.component';
import { ViewTablesComponent } from './view-tables/view-tables.component';

@NgModule({
imports:[CommonModule,NgxPaginationModule,FormsModule,ReactiveFormsModule,TableRoutingModule],
declarations:[TablemanagementComponent, ViewTablesComponent]
})

export class TableModule { }
