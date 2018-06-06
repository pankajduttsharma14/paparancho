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
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.OrderID = params['id'];
      // get all records by id
      this.OrderService.GetRecordsById(this.OrderID).subscribe(
        res => {
          this.OrderDetails = res.data;
          this.OrderData = res.Orderdata;

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
            this.router.navigate(['/order-list']);

          }, 1000);

        },
        err => {console.log(err)});

    });
  }



}
