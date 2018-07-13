import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReportsRoutingModule} from './reports.routing';
import {ReportsComponent} from './reports.component';
import {CalendarModule} from 'primeng/calendar';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';




@NgModule({
	imports:[CommonModule,NgxPaginationModule,ReportsRoutingModule,FormsModule,CalendarModule,
	ModalModule.forRoot(),ModalModule,ReactiveFormsModule,Ng4LoadingSpinnerModule],
	declarations:[ReportsComponent],
})

export class ReportsModule {}
