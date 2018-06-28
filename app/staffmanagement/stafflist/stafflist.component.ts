import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';




@Component({
  selector: 'app-stafflist',
  templateUrl: './stafflist.component.html',
  styleUrls: ['./stafflist.component.scss'],
  providers: [StaffService, Ng4LoadingSpinnerService],
  encapsulation: ViewEncapsulation.None,



})


export class StafflistComponent implements OnInit {
  StaffListForm: FormGroup;

  EditForm: FormGroup;
  // form settings
  "ol_id": number;
  "staff_id": number;
  "staff_login_id": string;
  // "pass_code": string;
  "password": string;
  "role_id": number;
  "first_name": string;
  "last_name": string;
  "mob_number": number;
  "address": string;
  "age": number;
  "gender": string;
  "status": string;


  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  @ViewChild('dangerModal') public dangerModel: ModalDirective;

  p: number = 1;
  public StaffList: any = {};
  public StaffRoles: any = [];
  public searchStaff: any = '';
  constructor(private StaffService: StaffService, private router: Router, private FormBuilder: FormBuilder, private spinnerService: Ng4LoadingSpinnerService) {
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
    // get staff list
    this.spinnerService.show();
    this.StaffService.GetStaffList().subscribe(
      res => {
        this.StaffList = res;
        this.spinnerService.hide();
      },
      err => { this.spinnerService.hide(); });

    // get staff Roles

    this.spinnerService.show();
    this.StaffService.GetStaffRoles().subscribe(
      res => { this.StaffRoles = res;
        this.spinnerService.hide(); },
      err => { this.spinnerService.hide(); });

  }

  ngOnInit() {
    this.StaffListForm = this.FormBuilder.group({

      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "staff_login_id": ['', Validators.compose([Validators.required])],
      // "pass_code": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "password": ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      "role_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      // "first_name": ['', Validators.compose([Validators.required, Validators.pattern(/^([^0-9]*)$/)])],
      "first_name": ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      // "last_name": ['', Validators.compose([Validators.required, Validators.pattern(/^([^0-9]*)$/)])],
      "last_name": ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      "mob_number": ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}$/)])],
      "address": ['', Validators.compose([Validators.required])],
      "age": ['', Validators.compose([Validators.required, Validators.min(18), Validators.pattern(/^\d{1,2}$/)])],
      "gender": ['', Validators.compose([Validators.required])],
      "status": ['', Validators.compose([Validators.required])],

    });
    this.EditForm = this.FormBuilder.group({
      "staff_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "staff_login_id": ['', Validators.compose([Validators.required])],
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],

      // "pass_code": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "password": ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      "role_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "login_status": ['', Validators.compose([Validators.required])],
      // "first_name": ['', Validators.compose([Validators.required, Validators.pattern(/^([^0-9]*)$/)])],
      "first_name": ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      // "last_name": ['', Validators.compose([Validators.required, Validators.pattern(/^([^0-9]*)$/)])],
      "last_name": ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      "mob_number": ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}$/)])],
      "address": ['', Validators.compose([Validators.required])],
      "age": ['', Validators.compose([Validators.required, Validators.min(18), Validators.pattern(/^\d{1,2}$/)])],
      "gender": ['', Validators.compose([Validators.required])],
      "status": ['', Validators.compose([Validators.required])],

    });

  }


  // Add Staff
  StaffMsg: string;

  AddStaffList(formData) {
    this.spinnerService.show();
    let data = formData.value;
    if (data) {
      formData.reset();
      this.StaffService.AddStaff(data).subscribe(
        res => {
          if (res.status == 200) {

            this.StaffMsg = res.message;
            // get all .categories
            this.StaffService.GetStaffList().subscribe(res => {
                this.StaffList = res;
                this.spinnerService.hide();
              },
              err => { this.spinnerService.hide(); }, );
            setTimeout(() => {
              this.spinnerService.hide();
              this.StaffMsg = null;
              this.largeModal.hide();
            }, 3000);

          } else {
            this.StaffMsg = "Staff can't added";
            this.spinnerService.hide();
            setTimeout(() => {

              this.StaffMsg = null;
              this.largeModal.hide();
            }, 3000);
          }
        },
        err => {
          this.StaffMsg = "Staff can't added";
          this.spinnerService.hide();
          setTimeout(() => {

            this.StaffMsg = null;
            this.largeModal.hide();
          }, 3000);
        }
      );
    }


  }


  staffId: any = '';
  // Delete Staff
  ConfirmDialog(id, trigger: boolean = false) {
    this.staffId = id;
    if (trigger == true) {

      this.DeleteStaffList(this.staffId);
      this.dangerModel.hide();

    } else { this.dangerModel.show(); }

  }


  DeleteStaffListMsg: string = null;
  // Delete Staff role
  DeleteStaffList(id) {
    this.spinnerService.show();
    this.StaffService.DeleteStaff(id).subscribe(res => {
      if (res.status = 200) {
        this.DeleteStaffListMsg = "Staff Deleted Successfully";


        this.StaffService.GetStaffList().subscribe(
          res => {
            this.StaffList = res;
            this.spinnerService.hide();
          },
          err => { this.spinnerService.hide(); });


        setTimeout(() => {
          this.DeleteStaffListMsg = null;
        }, 3000)
      } else {
        this.spinnerService.hide();
        setTimeout(() => {
          this.DeleteStaffListMsg = null;
        }, 3000)
      }

    }, err => {
      this.spinnerService.hide();
      setTimeout(() => {

        this.DeleteStaffListMsg = null;
      }, 3000)

    });
  }


  // edit staff
  Editrow = [];
  show(data, modal) {
    console.log(data);
    this.Editrow = new Array();
    this.Editrow.push(data);


    modal.show();
  }

  model = {
    "staff_id": '',
    "ol_id": '',
    'staff_login_id': '',
    // "pass_code": '',
    "password": '',
    "role_id": '',
    "login_status": '',
    "first_name": '',
    "last_name": '',
    "mob_number": '',
    "address": '',
    "age": '',
    "gender": '',
    "status": '',

  }
  Edit($event = 0) {

    this.model = null;
    this.model = {
      "staff_id": this.Editrow[0].staff_id,
      "ol_id": this.Editrow[0].ol_id,
      'staff_login_id': this.Editrow[0].staff_login_id,
      // "pass_code": this.Editrow[0].pass_code,
      "password": this.Editrow[0].password,
      "role_id": this.Editrow[0].role_id,
      "login_status": this.Editrow[0].login_status,
      "first_name": this.Editrow[0].first_name,
      "last_name": this.Editrow[0].last_name,
      "mob_number": this.Editrow[0].mob_number,
      "address": this.Editrow[0].address,
      "age": this.Editrow[0].age,
      "gender": this.Editrow[0].gender,
      "status": this.Editrow[0].status,

    }
    console.log(this.model);

  }


  UpdateStaffListMsg: string = null;

  UpdateStaffList(formData) {
    this.spinnerService.show();
    let data = formData.value;
    this.StaffService.EditStaffList(data).subscribe(res => {
      if (res.status == 200) {
        this.UpdateStaffListMsg = res.message;
        this.StaffService.GetStaffList().subscribe(
          res => {
            this.StaffList = res;
            this.spinnerService.hide();
          },
          err => {
            console.log(err);
            this.spinnerService.hide();
          });


        setTimeout(() => {
          this.UpdateStaffListMsg = null;
          this.largeModal1.hide();

        }, 3000);


      } else {
        this.spinnerService.hide();
        setTimeout(() => {
          this.UpdateStaffListMsg = null;
          this.largeModal1.hide();

        }, 3000);
      }
    }, err => {
      this.spinnerService.hide();
      setTimeout(() => {
        this.UpdateStaffListMsg = null;
        this.largeModal1.hide();

      }, 3000);

    });
  }




}
