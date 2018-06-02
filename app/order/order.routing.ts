import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrderlistComponent} from './orderlist/orderlist.component';
import {OrderComponent} from './order.component';
import {OrderdetailsComponent} from './orderdetails/orderdetails.component';
const routes :Routes= [
	{
		path:'',
    component:OrderComponent,
		data: {
      		title: 'Order'
    	},

    	children:[
    	{

    	  path:'',
    	  component: OrderlistComponent,
          data: {
          title: 'Order-List'
          },
      },
      {

        path:'order-list',
        component: OrderlistComponent,
          data: {
          title: 'Order-List'
          }

      },
      {

        path:'order-list/:id',
        component: OrderdetailsComponent,
          data: {
          title: 'Order-Details'
          }

      }

    	]
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class OrderRoutingModule{
	

}