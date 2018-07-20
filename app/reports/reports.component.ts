import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [Ng4LoadingSpinnerService, ReportsService, DatePipe],
  encapsulation: ViewEncapsulation.None,


})

export class ReportsComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  @ViewChild('dangerModal') public dangerModel: ModalDirective;
  public Vouchers;
  p: number = 1;
  ReportsForm: FormGroup;
  MisForm: FormGroup;
  ol_id: string;
  todate: string;
  fromdate: string;
  constructor(private router: Router, private fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService, private ReportsService: ReportsService, private DatePipe: DatePipe) {}



  TodayDate: any;
  ngOnInit() {
    this.CreateReportsForm();
    this.CreateMisForm();
    this.TodayDate = new Date().toJSON().split('T')[0];

  }

  CreateReportsForm() {

    this.ReportsForm = this.fb.group({

      "ol_id": ['', Validators.required],
      "todate": ['', Validators.required],
      "fromdate": ['', Validators.required]

    });
  }

  CreateMisForm() {

    this.MisForm = this.fb.group({

      "order_date": ['', Validators.required],


    });
  }


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
  ConvertDate(NewDate) {
    var date = new Date(NewDate);
    var day: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var ConvertedDate = year + "-" + month + "-" + day;

    return ConvertedDate;
  }

  ReportList: any = [];
  GetReports() {
    this.columns=new Array();
    this.columns = ["Order#", "Table#", "Bill#", "Ordered From","Stewards","Order Time","Order Date","Status","Total"];
    let data = {
      'ol_id': this.ReportsForm.controls['ol_id'].value,
      'todate': this.ConvertDate(this.ReportsForm.controls['todate'].value),
      'fromdate': this.ConvertDate(this.ReportsForm.controls['fromdate'].value),
    }

    this.spinnerService.show()
    this.ReportsService.GetReports(data).subscribe(res => {


      if (res.status == 200) {
        this.spinnerService.hide();
        let rec=res.data;
      for(var i=0;i<rec.length;i++)
      {
          this.ReportList.push({order_number:rec[i].order_number,table_number:rec[i].table_number,bill_no:rec[i].bill_no,order_from:rec[i].order_from,steward_name:rec[i].steward_name,order_time:rec[i].order_time,status:rec[i].status,grand_total:rec[i].grand_total});
      }


      } else {
        this.spinnerService.hide();
      }

      // this.spinnerService.hide();
    }, err => {
      this.spinnerService.hide();
    });

  }

  MinDate: any;
  ChangeDate(event) {
    this.MinDate = event.target.value;
  }


  ExportToCSV(Report) {

    this.ReportsService.download(Report, "SalesReport" + Date.now());
  }

  // pdf export
  ExportToPdf(columns: any, records: any) {
    var ReportList: any = this.ReportList;
    var doc = new jsPDF('p', 'pt');
    
    var dataFinal = new Array();
    for (let i = 0; i < records.length; i++) {
      var data = new Array();
      for (let key in records[i]) {

        data.push(records[i][key]);
      }

      dataFinal.push(data);
    }

    doc.autoTable(columns, dataFinal);
    doc.save("SalesReport" + Date.now());
  }



  transformDate(date) {
    return this.DatePipe.transform(date, 'yyyy-MM-dd');
  }


  MisReport: any = [];
  GetMisReport() {
    this.columns=new Array();
    this.columns = ["Item Name", "Item Quantity", "Average Price", "Net Amount"];
    this.spinnerService.show();
    let data = {
      'order_date': this.ConvertDate(this.MisForm.controls['order_date'].value)
    };

    this.ReportsService.GetMisReport(data).subscribe(res => {
      this.spinnerService.hide();
      let rec=res.data;
      for(var i=0;i<rec.length;i++)
      {
          this.MisReport.push({item_title:rec[i].item_title,item_qty:rec[i].item_qty,avrage_itm_price:rec[i].avrage_itm_price,net_amount:rec[i].net_amount});
      }
    }, err => {
      this.spinnerService.hide();
    }, () => {
      this.spinnerService.hide();
    });

  }

  columns:any=[];
  SavePDF(report)
  {

      this.ExportToPdf(this.columns,report);

  }




}
