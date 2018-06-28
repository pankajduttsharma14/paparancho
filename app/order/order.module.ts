import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderRoutingModule } from './order.routing';
import { DateTodayPipe } from './../pipes/date-today.pipe';
import {OrderdetailsComponent} from './orderdetails/orderdetails.component';
import {OrderComponent} from './order.component';
import { CompleteOrdersComponent } from './complete-orders/complete-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
	imports:[
	CommonModule, 
	NgxPaginationModule,
	OrderRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	Ng4LoadingSpinnerModule,
	Ng2SearchPipeModule
	
],

	declarations:[OrderlistComponent,DateTodayPipe, OrderdetailsComponent,OrderComponent,CompleteOrdersComponent],
	


})
export class OrderModule{}

