import { Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from '../../services/table.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-complete-orders',
  templateUrl: './complete-orders.component.html',
  styleUrls: ['./complete-orders.component.scss'],
  providers: [TableService, Ng4LoadingSpinnerService,OrderService],



})
export class CompleteOrdersComponent implements OnInit {
  // @ViewChild('largeModal') public largeModal: ModalDirective;
  // @ViewChild('largeModal1') public largeModal1: ModalDirective;
  // AddTable: FormGroup;
  // EditTable: FormGroup;

  OrderID: any;
  OrderDetails: any = [{}];
  hideStatus:boolean=true;
  PaymentForm:FormGroup;

  
  constructor(private TableService: TableService, private router: Router, private fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService,private activatedRoute: ActivatedRoute, private OrderService: OrderService) {
    // var status = localStorage.getItem('loginStatus');
    // if (status != "true") {
    //   this.router.navigate(['login']);
    // }

  }
 ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.OrderID = params['id'];
       this.spinnerService.show();
      // get all records by id
      this.OrderService.GenerateBill(this.OrderID).subscribe(
        res=>{
           this.spinnerService.hide();
          this.OrderDetails = res.data;
      }, err=>{});
    });
    this.CreatePayForm();
  }
  amount_return:any;
  CalcAmount(amount)
  {
   this.amount_return=amount-this.OrderDetails.Orderdata[0].grand_total;    
  }
  ChangeStatus(status)
  {
    this.hideStatus=!status;
  }
  PaymentStatus:boolean=null;
  PaymentReceived()
  {
      this.spinnerService.show();
      var data={ol_id:this.OrderDetails.Orderdata[0].ol_id,
          order_id:this.OrderDetails.Orderdata[0].order_id,
         status:"Completed",
         stid:this.OrderDetails.Orderdata[0].stid,
         cust_id:this.OrderDetails.Orderdata[0].cust_id,
         grand_total:this.OrderDetails.Orderdata[0].grand_total,
         amount_paid:this.PaymentForm.controls['amount_paid'].value,
         amount_return:this.amount_return,
         payment_by:this.PaymentForm.controls['payment_by'].value,
         is_bill_generated:this.OrderDetails.Orderdata[0].is_bill_generated
       }
         this.OrderService.PaymentReceived(data).subscribe(
        res => {
            if(res.status==200)
            {
              this.spinnerService.hide();
              this.PaymentStatus=true;
              setTimeout(()=>{ this.PaymentStatus=null;
              this.router.navigate(['dashboard/table-management/view-tables']);
              },3000);
            }
            else{
                this.spinnerService.hide();
                this.PaymentStatus=false;
                setTimeout(()=>{ this.PaymentStatus=null;
                
                },3000);

            }

        },err=>{
          this.spinnerService.hide();
                this.PaymentStatus=false;
                setTimeout(()=>{ this.PaymentStatus=null;
                },3000);

        });
   
  }


  CreatePayForm()
  {
    this.PaymentForm= this.fb.group({
        "amount_paid":['',Validators.required],
        "payment_by":['',Validators.required],
    });


  }
 print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section1').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Bill Preview</title>
          <style>
          @media print
          {
              table {page-break-after:always}
          }
          th
          {
            color:#1a1a1a;
            font-weight:normal;
          } 
          
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
  
}
