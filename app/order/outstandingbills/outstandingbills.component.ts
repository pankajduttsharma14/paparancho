import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-outstandingbills',
  templateUrl: './outstandingbills.component.html',
  styleUrls: ['./outstandingbills.component.scss'],
  providers: [OrderService, Ng4LoadingSpinnerService]
})
export class OutstandingbillsComponent implements OnInit {
  p: number = 1;
  constructor(private OrderService: OrderService, private loading: Ng4LoadingSpinnerService) {}

  ngOnInit() {
  	// this.GetPendingBills();
  }

  // PendingOrders: any = [];
  // PendingOrdersError: boolean = false;
  // GetPendingBills() {
    
  //   this.PendingOrdersError = false;
  //   this.loading.show();
  //   this.OrderService.GetPendingBills().subscribe(res => {

  //     if (res.status == 200) {
  //       this.loading.hide();
  //       this.PendingOrders = res.data;
  //     } else {
  //       this.loading.hide();
  //       this.PendingOrdersError = true;
  //     }
  //   }, err => {
  //     this.loading.hide();
  //     this.PendingOrdersError = true;

  //   });
  // }
}
