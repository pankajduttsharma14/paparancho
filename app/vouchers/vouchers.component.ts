import { Component, OnInit } from '@angular/core';
import { VouchersService } from '../services/vouchers.service';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss'],
  providers: [VouchersService],
  encapsulation: ViewEncapsulation.None,


})
export class VouchersComponent implements OnInit {
  public Vouchers;


  constructor(private VouchersService: VouchersService, private router: Router) {
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
    // get all vouchers
    this.VouchersService.GetAllVouchers().subscribe(res => { this.Vouchers = res.data }, err => { console.log(err) });


  }

  ngOnInit() {
  }
  // Add voucher
  VoucherData = {};
  VoucherMsg: string = null;
  AddVoucher(formData): any {

    var data = formData.value;
    var time = data.time;
    function formatAMPM(time) {
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

    this.VoucherData = {
      'vcr_name': data.VName,
      'type': data.VType,
      'value': data.Vvalue,
      'status': data.status1,
      'valid_till_date': data.valid_till,
      'valid_before': formatAMPM(time),

    };

    this.VouchersService.AddVoucher(this.VoucherData).subscribe(res => {
      if (res.status) {
        this.VoucherMsg = res.message;
        formData.reset();
        // update vouchers list
        this.VouchersService.GetAllVouchers().subscribe(res => { this.Vouchers = res.data }, err => { console.log(err) });
        setTimeout(() => {
          this.VoucherMsg = null;
        }, 3000);
      }
    },
      err => {
        this.VoucherMsg = err;
        setTimeout(() => {
          this.VoucherMsg = null;
          formData.reset();

        }, 3000);


      });
  }

  // Delete Voucher
  DeleteVoucher(id){
    this.VouchersService.DeleteVoucher(id).subscribe(res=>{
      if(res.status==200)
      {
        this.VoucherMsg=res.message;
        setTimeout(()=>{
          this.VoucherMsg=null;

        },3000);
      }
      else{
        this.VoucherMsg="Voucher Cant Deleted";
        setTimeout(()=>{
          this.VoucherMsg=null;

        },3000);
      }

    },err=>{
      this.VoucherMsg="Voucher Cant Deleted";
      setTimeout(()=>{
        this.VoucherMsg=null;

      },3000);
    });

}

}
