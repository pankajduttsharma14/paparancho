import { Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from '../../services/table.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-view-tables',
  templateUrl: './view-tables.component.html',
  styleUrls: ['./view-tables.component.scss'],
  providers: [TableService, Ng4LoadingSpinnerService],



})
export class ViewTablesComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  @ViewChild('dangerModal') public dangerModel: ModalDirective;
  AddTable: FormGroup;
  EditTable: FormGroup;


  constructor(private TableService: TableService, private router: Router, private fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService) {

    // var status = localStorage.getItem('loginStatus');
    // if (status != "true") {
    //   this.router.navigate(['login']);
    // }
    this.CreateForm();
    this.CreateEditForm();



  }


  CreateForm(): void {
    this.AddTable = this.fb.group({
      "ol_id": ['', [Validators.required, Validators.min(0)]],

      "seat_cap": ['', [Validators.required, Validators.min(1) ]],
      "is_available": ['', [Validators.required]],
      "status": ['', [Validators.required]],
    });
  }

  CreateEditForm(): void {
    this.EditTable = this.fb.group({
      "stid": [''],
      "seat_cap": ['', [Validators.required, Validators.min(1)]],
      "status": ['', [Validators.required]],

    });

  }

  public GetTables = [];
  GetTablesMsg;
  ngOnInit() {
   this.GetAllTables();

  }
TableHeading:string;
  GetAllTables()
  {  this.TableHeading='All Tables';
     this.spinnerService.show();
    this.TableService.GetAllTable().subscribe(res => {
        if (res.status == 200) {
          this.GetTables = res.data;
          this.spinnerService.hide();
        } else {
          this.GetTablesMsg = "No Tables For Display";
          this.spinnerService.hide();
        }
      },
      err => {
        this.GetTablesMsg = "No Tables For Display";
        this.spinnerService.hide();
      });
  }

  GetRunningTables()
  {
     this.TableHeading='Running Tables';
    this.spinnerService.show();
    this.TableService.GetRunningTables().subscribe(res => {
        if (res.status == 200) {
          this.GetTables = res.data;
          this.spinnerService.hide();
        } else {
          this.GetTablesMsg = "No Tables For Display";
          this.spinnerService.hide();
        }
      },
      err => {
        this.GetTablesMsg = "No Tables For Display";
        this.spinnerService.hide();
      });
  }


  // view table details
  TableDetail = null;
  SeatCap = null;
  TableOrders = null;
  TableDetails(TableData) {
    console.log(TableData);
    this.TableDetail = Array();
    this.SeatCap = Array();
    this.TableOrders = Array();
    if (TableData) {
      // get orders tablse wise
      var TableId = TableData.stid;
      this.spinnerService.show();
      this.TableService.GetOrderByTableId(TableId).subscribe(res => {

        if (res.status == 200) {
          this.TableOrders = res.order_ids;
          this.spinnerService.hide();

        } else {
          this.TableOrders = null;
          this.spinnerService.hide();
        }
      }, err => {
        this.TableOrders = null;
        this.spinnerService.hide();
      });
      this.TableDetail.push(TableData);

      for (var i = 0; i < this.TableDetail[0].seat_cap; i++) {
        this.SeatCap.push(i);
      }



    } else {
      this.TableDetail = null;
      this.spinnerService.hide();
    }
  }


  // table id custom validator  
  // TableValidator: any = (control: FormControl) => {
  //   let stid = control.value;
  //   if (stid && stid != null) {
  //     for (var i = 0; i < this.GetTables.length; i++) {
  //       if (stid == this.GetTables[i].stid) {

  //         return { 'TableValidator': true };

  //       }

  //     }
  //   } else {

  //     return { 'TableValidator': true };
  //   }

  // }



  // Add service table
  AddTableMsg: string = null;
  AddServiceTable(formData) {
    this.spinnerService.show();
    let data = formData.value;
    this.CreateForm();

    this.TableService.AddTable(data).subscribe(res => {
      if (res.status == 200) {

        this.AddTableMsg = "Table has been added!";
        this.TableService.GetAllTable().subscribe(res => {
            if (res.status == 200) {

              this.GetTables = res.data;
              this.spinnerService.hide();
            } else {
              this.GetTablesMsg = "No Tables For Display";
              this.spinnerService.hide();
            }
          },
          err => {
            this.GetTablesMsg = "No Tables For Display";
            this.spinnerService.hide();
          });
        setTimeout(() => {
          this.AddTableMsg = null;
          this.largeModal.hide();
        }, 3000);
      } else {

        this.AddTableMsg = "Table can't added!";
        this.spinnerService.hide();
        setTimeout(() => {
          this.AddTableMsg = null;
          this.largeModal.hide();
        }, 3000);

      }

    }, err => {
      this.spinnerService.hide();
      setTimeout(() => {
        this.AddTableMsg = null;
        this.largeModal.hide();
      }, 3000);
    });
  }

  ClearMsg: any = [];
  // clear table
  ClearTable(table) {

    this.spinnerService.show();
    let id=table.stid;
    this.TableService.ClearTable(id).subscribe(res => {

      if (res.status == 200 && res.data.status!=400) {

        this.ClearMsg.push({ 'message': 'Table Cleared', 'status': true });
        this.TableService.GetAllTable().subscribe(res => {
          if (res.status == 200) {
            this.GetTables = res.data;
            for(var i=0;i<res.data.length;i++)
            {  
                if(res.data[i].stid==table.stid)
                {
                      this.TableDetails(res.data[i]);
                }
            }
            this.spinnerService.hide();
          } else {
            this.GetTablesMsg = "No Tables For Display";
            this.spinnerService.hide();
          }
        }, err => {
          this.GetTablesMsg = "No Tables For Display";
          this.spinnerService.hide();
        });

        setTimeout(() => {
          this.ClearMsg = Array();

        }, 3000);



      } else {

        this.ClearMsg.push({ 'message': 'Order is running on this table!', 'status': false });
        this.spinnerService.hide();

        setTimeout(() => {
          this.ClearMsg = Array();

        }, 3000);
      }

    }, err => {
      this.ClearMsg.push({ 'message': 'Order is running on this table!', 'status': false });
      this.spinnerService.hide();

      setTimeout(() => {
        this.ClearMsg = Array();

      }, 3000);

    });
  }


  model = {
    "stid": '',
    "seat_cap": '',
    "status": '',
  }
  // Edit Table
  EditServiceTable() {
    this.model = {
      "stid": this.TableDetail[0].stid,
      "seat_cap": this.TableDetail[0].seat_cap,
      "status": this.TableDetail[0].status,
    }
    this.largeModal1.show();

  }

  EditTableMsg: boolean = null;
  UpdateTable(formData) {
    this.EditTableMsg=null;
    this.spinnerService.show();
    let data = formData.value;
    this.TableService.UpdateTable(data).subscribe(res => {
      if (res.status == 200) {
        this.EditTableMsg=true;        
        this.TableService.GetAllTable().subscribe(res => {
            if (res.status == 200) {
              this.GetTables = res.data;
               for(var i=0;i<res.data.length;i++)
            {  
                if(res.data[i].stid==data.stid)
                {
                      this.TableDetails(res.data[i]);
                }
            }
              this.spinnerService.hide();

            } else {
              this.GetTablesMsg = "No Tables For Display";
              this.spinnerService.hide();

            }
          },
          err => {
            this.GetTablesMsg = "No Tables For Display";
            this.spinnerService.hide();
          });

        setTimeout(() => {
          this.largeModal1.hide();
          this.EditTableMsg = null;

        }, 3000);
      } else {
        this.EditTableMsg=false;


        setTimeout(() => {
          this.largeModal1.hide();
          this.EditTableMsg = null;

        }, 3000);
      }

    }, err => {
      this.EditTableMsg=false;
      setTimeout(() => {
        this.largeModal1.hide();
        this.EditTableMsg = null;

      }, 3000);
    });
  }

  // Confirm box
   // delete category
  TableId: any = '';
  ConfirmDialog(id, trigger: boolean = false) {
    this.TableId = id;
    if (trigger == true) {

      this.ClearTable(this.TableId);
      this.dangerModel.hide();

    } else { this.dangerModel.show(); }

  }


  

}
