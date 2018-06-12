import { Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from '../../services/table.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-tables',
  templateUrl: './view-tables.component.html',
  styleUrls: ['./view-tables.component.scss'],
  providers: [TableService],



})
export class ViewTablesComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  AddTable: FormGroup;
  

  constructor(private TableService: TableService, private router: Router, private fb: FormBuilder) {

    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }

    this.AddTable = this.fb.group({
      "ol_id": ['', [Validators.required, Validators.min(0)]],
      "srtbl_no": ['', [Validators.required, Validators.min(0), this.TableValidator]],
      "seat_cap": ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      "is_available": ['', [Validators.required]],
      "status": ['', [Validators.required]],
    });
    

  }

  public GetTables = [];
  GetTablesMsg;
  ngOnInit() {
    this.TableService.GetAllTable().subscribe(res => {if (res.status == 200) {this.GetTables = res.data;

        } else {
          this.GetTablesMsg = "No Tables For Display";
        }
      },
      err => {
        this.GetTablesMsg = "No Tables For Display";
      });
  }
  // view table details
  TableDetail = null;
  SeatCap = null;
  TableOrders = null;
  TableDetails(TableData) {
    this.TableDetail = Array();
    this.SeatCap = Array();
    this.TableOrders = Array();
    if (TableData) {
      // get orders tablse wise
      var TableId = TableData.srtbl_no;

      this.TableService.GetOrderByTableId(TableId).subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.TableOrders = res.data;


        } else {
          this.TableOrders = null;
        }
      }, err => {
        this.TableOrders = null;

      });
      this.TableDetail.push(TableData);

      for (var i = 0; i < this.TableDetail[0].seat_cap; i++) {
        this.SeatCap.push(i);
      }



    } else {
      this.TableDetail = null;
    }
  }


  // table id custom validator  
  TableValidator:any=(control:FormControl)=>{
           let srtbl_no=control.value;
            if(srtbl_no && srtbl_no!=null)
           {    
                for(var i=0;i<this.GetTables.length;i++)
                {  
                   if(srtbl_no==this.GetTables[i].srtbl_no)
                   {
                     
                     return {'TableValidator':true};
                     
                   }
                   
                }                           
           }
           else{

             return {'TableValidator':true};
           }
           
   }



  // Add service table
  AddTableMsg: string = null;
  AddServiceTable(formData) {

    let data = formData.value;


    this.TableService.AddTable(data).subscribe(res => {
      if (res.status == 200) {
        this.AddTableMsg = "Table has been added!";
        this.TableService.GetAllTable().subscribe(res => {
            if (res.status == 200) {
              this.GetTables = res.data;
            } else {
              this.GetTablesMsg = "No Tables For Display";
            }
          },
          err => {
            this.GetTablesMsg = "No Tables For Display";
          });
        setTimeout(() => {
          this.AddTableMsg = null;
          this.largeModal.hide();
        }, 3000);
      } else {

        this.AddTableMsg = "Table can't added!";
        setTimeout(() => {
          this.AddTableMsg = null;
          this.largeModal.hide();
        }, 3000);

      }

    }, err => {
      setTimeout(() => {
        this.AddTableMsg = null;
        this.largeModal.hide();
      }, 3000);
    });
  }
}
