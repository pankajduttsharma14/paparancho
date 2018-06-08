import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {VoucherRoutingModule} from './voucher.routing';
import {VouchersComponent} from './vouchers.component';
import {CalendarModule} from 'primeng/calendar';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


@NgModule({
	imports:[CommonModule,NgxPaginationModule,VoucherRoutingModule,FormsModule,CalendarModule,
	ModalModule.forRoot(),ModalModule,ReactiveFormsModule,Ng4LoadingSpinnerModule],
	declarations:[VouchersComponent],
})

export class  VouchersModule {}
