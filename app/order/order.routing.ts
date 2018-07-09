import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrderlistComponent} from './orderlist/orderlist.component';
import {OrderComponent} from './order.component';
import {OrderdetailsComponent} from './orderdetails/orderdetails.component';
import { CompleteOrdersComponent } from './complete-orders/complete-orders.component';
import { OutstandingbillsComponent } from './outstandingbills/outstandingbills.component';
const routes :Routes= [
	{
		path:'',
    
		data: {
      		title: 'Order Management'
    	},

    	children:[
    	{

    	  path:'',
    	  component: OrderlistComponent,
          data: {
          title: 'Order-List'
          },
          pathMatch:'full'
      },
      {

        path:'order-list',
        component: OrderlistComponent,
          data: {
          title: 'Order-List'
          },
          pathMatch:'full'

      },
      {

        path:'order-details/:id',
        component: OrderdetailsComponent,
          data: {
          title: 'Order-Details'
          },
          pathMatch:'full'

      },
      {
        path: 'complete-orders/:id',
        component: CompleteOrdersComponent,
        data: {
          title: 'Complete Orders'
        },
        pathMatch:'full'
      },
      {
        path: 'outstanding-bills',
        component: OutstandingbillsComponent,
        data: {
          title: 'Outstanding Bills'
        },
        pathMatch:'full'
      }


    	]
	},
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class OrderRoutingModule{
	

}