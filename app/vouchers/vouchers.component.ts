import { Component, OnInit,ViewChild } from '@angular/core';
import { VouchersService } from '../services/vouchers.service';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss'],
  providers: [VouchersService],
  encapsulation: ViewEncapsulation.None,


})
export class VouchersComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  public Vouchers;
  p: number = 1;
  EditForm: FormGroup;

  constructor(private VouchersService: VouchersService, private router: Router, private fb: FormBuilder) {
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
    // get all vouchers
    this.VouchersService.GetAllVouchers().subscribe(res => { this.Vouchers = res.data }, err => { console.log(err) });
    this.EditForm = fb.group({
      "id": ['', Validators.compose([Validators.required])],
      "vcr_name": ['', Validators.compose([Validators.required])],
      "type": ['', Validators.compose([Validators.required])],
      "value": ['', Validators.compose([Validators.required])],
      "status": ['', Validators.compose([Validators.required])],
      "valid_till_date": ['', Validators.compose([Validators.required])],
      "valid_before": ['', Validators.compose([Validators.required])],
});

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
  DeleteVoucher(id) {
    this.VouchersService.DeleteVoucher(id).subscribe(res => {
      if (res.status == 200) {
        this.VoucherMsg = "Voucher Deleted Successfully!";
        // update vouchers list
        this.VouchersService.GetAllVouchers().subscribe(res => { this.Vouchers = res.data }, err => { console.log(err) });
        setTimeout(() => {
          this.VoucherMsg = null;

        }, 3000);
      }
      else {
        this.VoucherMsg = "Voucher Cant Deleted";
        setTimeout(() => {
          this.VoucherMsg = null;

        }, 3000);
      }

    }, err => {
      this.VoucherMsg = "Voucher Cant Deleted";
      setTimeout(() => {
        this.VoucherMsg = null;
      }, 3000);
    });

  }
  // EDIT  VOUCHER ------------------------------------------------------
  Editrow = [];
  show(data, modal) {

    this.Editrow = new Array();
    this.Editrow.push(data);
    modal.show();
  }

  model = {
    "id":'',
    "vcr_name":'',
    "type":'',
    "value":'',
    "status":'',
    "valid_till_date":'',
    "valid_before": ''

  }
  Edit($event=0) {

    this.model = null;
    this.model = {
      "id":this.Editrow[0].id,
      "vcr_name":this.Editrow[0].vcr_name,
      "type":this.Editrow[0].type,
      "value":this.Editrow[0].value,
      "status":this.Editrow[0].status,
      "valid_till_date":this.Editrow[0].valid_till_date,
      "valid_before":this.Editrow[0].valid_before,

    }

  }
  EditVoucher(formData) {



  }

}
