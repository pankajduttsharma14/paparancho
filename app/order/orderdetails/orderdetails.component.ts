import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss'],
  providers: [OrderService]
})

export class OrderdetailsComponent implements OnInit {
  OrderID: any;
  OrderDetails: any = [{}];
  OrderData: any = [{}];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private OrderService: OrderService) {
    // var status = localStorage.getItem('loginStatus');
    // if (status != "true") {
    //   this.router.navigate(['login']);
    // }



  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.OrderID = params['id'];

      // get all records by id
      this.OrderService.GetRecordsById(this.OrderID).subscribe(
        res => {
          this.OrderDetails = res;
          this.CheckServedOrder(this.OrderDetails.data);

        }, err => { console.log(err) });
    });
  }




  public OrderStatus: any;
  // CancelOrder order
  CancelOrder(id) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.OrderID = params['id'];
      this.OrderService.CancelOrder(id).subscribe(
        res => {
          this.OrderStatus = res.data;

          setTimeout(() => {
            this.router.navigate(['/dashboard/order/order-list']);
            this.OrderStatus = null;
          }, 1000);

        },
        err => { console.log(err);
          this.OrderStatus = null; });

    });
  }
  // checkServedOrder

  ServedStatus: any = false;
  CheckServedOrder(records) {

    if (!records) return null;
    else {


      for (var i = 0; i < records.length; i++) {
        if (records[i].status == 'Served') {
          this.ServedStatus = true;
          
          break;
        } else {
            this.ServedStatus = null;
          continue;
        }

      }
    }
  }



}
