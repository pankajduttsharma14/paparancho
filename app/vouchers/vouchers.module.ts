import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {VoucherRoutingModule} from './voucher.routing';
import {VouchersComponent} from './vouchers.component';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
	imports:[CommonModule,NgxPaginationModule,VoucherRoutingModule,FormsModule,CalendarModule,
	ModalModule.forRoot()],
	declarations:[VouchersComponent],
})

export class  VouchersModule {}