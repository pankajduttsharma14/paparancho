import { Component, OnInit } from '@angular/core';
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
  constructor(private router:Router, private OrderService:OrderService) { 
  	var status=localStorage.getItem('loginStatus');
  	if(status!="true")
  	{
  		this.router.navigate(['login']);
  	}
    // get all records
    this.OrderService.GetAllOrder().subscribe(
      res=>{this.OrderList=res.data;},err=>{console.log(err)}); 
    
    
    
}
 ngOnInit() {}
  
  // todays Orders
  SwitchFilter(value:boolean)
  { 
    this.switch=value;
    return this.switch;
  }


}
