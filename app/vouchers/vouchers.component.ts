import { Component, OnInit,ViewChild } from '@angular/core';
import { VouchersService } from '../services/vouchers.service';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss'],
  providers: [VouchersService,Ng4LoadingSpinnerService],
  encapsulation: ViewEncapsulation.None,


})

export class VouchersComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  @ViewChild('dangerModal') public dangerModel: ModalDirective;
  public Vouchers;
  p: number = 1;
  EditForm: FormGroup;
  constructor(private VouchersService: VouchersService, private router: Router, private fb: FormBuilder,private spinnerService: Ng4LoadingSpinnerService){
    // var status = localStorage.getItem('loginStatus');
    // if (status != "true") {
    //   this.router.navigate(['login']);
    // }
    // get all vouchers
    this.spinnerService.show();
    this.VouchersService.GetAllVouchers().subscribe(res => { this.Vouchers = res.data;this.spinnerService.hide(); }, err => { this.spinnerService.hide(); });
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
   formatAMPM(time) {
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
  VoucherData = {};
  VoucherMsg: string = null;
  AddVoucher(formData): any {
    this.spinnerService.show();
    var data = formData.value;
    var time = data.time;
    

    this.VoucherData = {
      'vcr_name': data.VName,
      'type': data.VType,
      'value': data.Vvalue,
      'status': data.status1,
      'valid_till_date': data.valid_till,
      'valid_before': this.formatAMPM(time),

    };

    this.VouchersService.AddVoucher(this.VoucherData).subscribe(res => {
      if (res.status) {

        this.VoucherMsg = res.message;
        formData.reset();
        // update vouchers list
        this.VouchersService.GetAllVouchers().subscribe(res => { this.Vouchers = res.data;this.spinnerService.hide(); }, err => { this.spinnerService.hide(); });
        setTimeout(() => {

          this.VoucherMsg = null;
          this.largeModal.hide();
        }, 3000);
      }
      else{
        this.spinnerService.hide();
        this.VoucherMsg = "Voucher cant added!";
        setTimeout(() => {
          this.VoucherMsg = null;
          this.largeModal.hide();
        }, 3000);
      }
    },
      err => {

        this.VoucherMsg = "Voucher cant added!";
        this.spinnerService.hide();
        setTimeout(() => {
          this.VoucherMsg = null;
          formData.reset();
          this.largeModal.hide();

        }, 3000);


      });
  }

  // Delete Voucher
  DeleteVoucher(id) {
    this.spinnerService.show();
    this.VouchersService.DeleteVoucher(id).subscribe(res => {
      if (res.status == 200) {
        this.VoucherMsg = "Voucher Deleted Successfully!";
        // update vouchers list
        this.VouchersService.GetAllVouchers().subscribe(res => { this.Vouchers = res.data;this.spinnerService.hide(); }, err => { this.spinnerService.hide(); });
        setTimeout(() => {
          this.VoucherMsg = null;

        }, 3000);
      }
      else {
        this.VoucherMsg = "Voucher Cant Deleted";
        this.spinnerService.hide();
        setTimeout(() => {
          this.VoucherMsg = null;

        }, 3000);
      }

    }, err => {
      this.VoucherMsg = "Voucher Cant Deleted";
      this.spinnerService.hide();
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
    var date=new Date(this.Editrow[0].valid_till_date);
    var day:any = date.getDate();
    var month:any = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    this.model = null;
    this.model = {
      "id":this.Editrow[0].id,
      "vcr_name":this.Editrow[0].vcr_name,
      "type":this.Editrow[0].type,
      "value":this.Editrow[0].value,
      "status":this.Editrow[0].status,
      // "valid_till_date":new Date(date.getDay()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()),
      "valid_till_date":year+"-"+month+"-"+day,
      "valid_before":this.Editrow[0].valid_before,

    }




}

UpdateVoucherMsg:string=null;
// Update voucher msg
  UpdateVoucher(formData) {
    this.spinnerService.show();
  
    let data=formData.value;
    var post = {
    "id":data.id,
    "vcr_name":data.vcr_name,
    "type":data.type,
    "value":data.value,
    "status":data.status,
    "valid_till_date":data.valid_till_date,
    "valid_before":this.formatAMPM(data.valid_before),

  }
    this.VouchersService.UpdateVoucher(post).subscribe(res=>{
        if(res.status==200)
        {
          this.UpdateVoucherMsg="Voucher updated successfully!";
          this.VouchersService.GetAllVouchers().subscribe(res => { this.Vouchers = res.data;this.spinnerService.hide(); }, err => {this.spinnerService.hide();});
          setTimeout(()=>{
            this.UpdateVoucherMsg=null;
            this.largeModal1.hide();
          },3000);
        }
        else{
            this.UpdateVoucherMsg="Unable to update voucher!";
            this.spinnerService.hide();
            setTimeout(()=>{
              this.UpdateVoucherMsg=null;
              this.largeModal1.hide();
            },3000);
        }
    },
    err=>{

      this.UpdateVoucherMsg="Unable to update voucher!";
      this.spinnerService.hide();
      setTimeout(()=>{
        this.UpdateVoucherMsg=null;
        this.largeModal1.hide();
      },3000);
    });


  }

  VoucherId: any = '';
  ConfirmDialog(id, trigger: boolean = false) {
    this.VoucherId = id;
    if (trigger == true) {

      this.DeleteVoucher(this.VoucherId);
      this.dangerModel.hide();

    } else { this.dangerModel.show(); }

  }
  TodayDate:any;
  ShowModel()
  {
    this.TodayDate = new Date().toJSON().split('T')[0];
    this.largeModal.show();

  }

}
