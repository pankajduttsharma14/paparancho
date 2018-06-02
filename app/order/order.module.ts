import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderRoutingModule } from './order.routing';
import { DateTodayPipe } from './../pipes/date-today.pipe';
import {OrderdetailsComponent} from './orderdetails/orderdetails.component';
import {OrderComponent} from './order.component';


@NgModule({
	imports:[
	CommonModule, 
	NgxPaginationModule,
	OrderRoutingModule,
	
],

	declarations:[OrderlistComponent,DateTodayPipe, OrderdetailsComponent,OrderComponent],
	


})
export class OrderModule{}

