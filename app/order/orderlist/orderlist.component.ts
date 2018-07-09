import { Component, OnInit,ElementRef } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
  providers: [OrderService],
  
})
export class OrderlistComponent implements OnInit {
  switch:boolean;
  public OrderList=[];
  p: number = 1;
  search:any;
  constructor(private router:Router, private OrderService:OrderService, private elm:ElementRef) { 
  	// var status=localStorage.getItem('loginStatus');
  	// if(status!="true")
  	// {
  	// 	this.router.navigate(['login']);
  	// }
    // get all records
    this.OrderService.GetAllOrder().subscribe(
      res=>{
      //this.OrderList=res.data;
      var data=new Array();
      for(var i=0;i<res.data.length;i++)
      { var  resData=res.data[i];
        data.push({id:resData.id,stid:resData.stid,staff_name:resData.staff_name,order_from:resData.order_from,createdAt:resData.createdAt,order_time:resData.order_time,total_amt:resData.total_amt,tax_amt:resData.tax_amt,payment_by:resData.payment_by,status:resData.status,grand_total:resData.grand_total});
      }
      this.OrderList=data;

      },err=>{console.log(err)}); 
    
    
    
}
 ngOnInit() {}
  
  // todays Orders
  SwitchFilter(value:boolean, event)
  { 
    console.log(event.target.value);
    this.switch=value;
    return this.switch;
  }


}
