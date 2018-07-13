import { Component, OnInit,ViewChild } from '@angular/core';
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
  providers: [Ng4LoadingSpinnerService,ReportsService,DatePipe],
  encapsulation: ViewEncapsulation.None,


})

export class ReportsComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  @ViewChild('dangerModal') public dangerModel: ModalDirective;
  public Vouchers;
  p: number = 1;
  ReportsForm: FormGroup;
  ol_id:string;
  todate:string;
  fromdate:string;
  constructor(private router: Router, private fb: FormBuilder,private spinnerService: Ng4LoadingSpinnerService, private ReportsService:ReportsService, private DatePipe:DatePipe){
  }



TodayDate:any;
  ngOnInit() {
    this.CreateReportsForm();
    this.TodayDate = new Date().toJSON().split('T')[0];

  }
  
  CreateReportsForm()
  {

    this.ReportsForm=this.fb.group({

       "ol_id":['',Validators.required],
        "todate":['',Validators.required],
        "fromdate":['',Validators.required]

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
    var date=new Date(NewDate);
    var day:any = date.getDate();
    var month:any = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var ConvertedDate=year+"-"+month+"-"+day;
    
   return ConvertedDate;
}

ReportList:any=[];
GetReports()
{   
    

  let data={
      'ol_id':this.ReportsForm.controls['ol_id'].value,
      'todate':this.ConvertDate(this.ReportsForm.controls['todate'].value),
      'fromdate':this.ConvertDate(this.ReportsForm.controls['fromdate'].value),
  }

    this.spinnerService.show()
    this.ReportsService.GetReports(data).subscribe(res=>{
      
      
          if(res.status==200)
          {
            this.spinnerService.hide();
            this.ReportList=res.data;
            

          }
          else
          {
              this.spinnerService.hide();
          }
          
             // this.spinnerService.hide();
    },err=>{
        this.spinnerService.hide();
    });

}

MinDate:any;
ChangeDate(event)
{
 
 this.MinDate= event.target.value;
}


ExportToCSV()
{

  this.ReportsService.download(this.ReportList,"SalesReport"+Date.now());
}

// pdf export
ExportToPdf()
{

  var ReportList:any=this.ReportList;
var doc = new jsPDF('p', 'pt');
var columns = ["Order#", "Table#", "Bill#", "Ordered From","Stewards","Order Time","Order Date","Status","Total"];

var data=new Array();
for(var i=0;i<ReportList.length;i++)
{
  data.push(new Array(ReportList[i].order_number,
    ReportList[i].table_number,
    ReportList[i].bill_no,
    ReportList[i].order_from, ReportList[i].steward_name,ReportList[i].order_time,this.transformDate(ReportList[i].createdAt),this.ReportList[i].status, ReportList[i].grand_total));
  
}

// var data = [
//     [1, "Jonatan", 25, "Gothenburg"],
//     [2, "Simon", 23, "Gothenburg"],
//     [3, "Hanna", 21, "Stockholm"]
// ];


doc.autoTable(columns, data);
doc.save("SalesReport"+Date.now());
   
}


transformDate(date) {
    return this.DatePipe.transform(date, 'yyyy-MM-dd');
  }







}
