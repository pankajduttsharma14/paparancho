import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-stafflist',
  templateUrl: './stafflist.component.html',
  styleUrls: ['./stafflist.component.scss'],
  providers: [StaffService],

})


export class StafflistComponent implements OnInit {
  StaffListForm: FormGroup;
  EditForm: FormGroup;
  // form settings
  "ol_id": number;
  "staff_login_id": string;
  "pass_code": string;
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
  p: number = 1;
  public StaffList: any = {};
  constructor(private StaffService: StaffService, private router: Router, private FormBuilder: FormBuilder) {
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
    // get staff list
    this.StaffService.GetStaffList().subscribe(
      res => { this.StaffList = res },
      err => { console.log(err) });
  }

  ngOnInit() {
    this.StaffListForm = this.FormBuilder.group({

      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "staff_login_id": ['', Validators.compose([Validators.required])],
      "pass_code": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "password": ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      "role_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "first_name": ['', Validators.compose([Validators.required, Validators.pattern(/^([^0-9]*)$/)])],
      "last_name": ['', Validators.compose([Validators.required, Validators.pattern(/^([^0-9]*)$/)])],
      "mob_number": ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}$/)])],
      "address": ['', Validators.compose([Validators.required])],
      "age": ['', Validators.compose([Validators.required, Validators.min(18), Validators.pattern(/^\d{1,2}$/)])],
      "gender": ['', Validators.compose([Validators.required])],
      "status": ['', Validators.compose([Validators.required])],

    });
    this.EditForm = this.FormBuilder.group({
      "staff_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "pass_code": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "password": ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      "role_id": ['', Validators.compose([Validators.required, Validators.min(1)])],
      "login_status": ['', Validators.compose([Validators.required])],
      "first_name": ['', Validators.compose([Validators.required, Validators.pattern(/^([^0-9]*)$/)])],
      "last_name": ['', Validators.compose([Validators.required, Validators.pattern(/^([^0-9]*)$/)])],
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
    let data = formData.value;
    if (data) {
      formData.reset();
      this.StaffService.AddStaff(data).subscribe(
        res => {
          if (res.status == 200) {

            this.StaffMsg = res.message;
            // get all .categories
            this.StaffService.GetStaffList().subscribe(res => { this.StaffList = res; },
              err => { console.log(err) }, );
            setTimeout(() => {
              this.StaffMsg = null;
              this.largeModal.hide();
            }, 3000);

          } else {
            this.StaffMsg = "Staff can't added";
          }
        },
        err => {
          this.StaffMsg = "Staff can't added";
        }
      );
    }


  }

  // Delete Staff

  DeleteStaffListMsg: string = null;
  // Delete Staff role
  DeleteStaffList(id) {
    this.StaffService.DeleteStaffRole(id).subscribe(res => {
      if (res.status = 200) {
        this.DeleteStaffListMsg = "Staff Deleted Successfully";

        this.StaffService.GetStaffList().subscribe(
          res => { this.StaffList = res },
          err => { console.log(err) });


        setTimeout(() => {
          this.DeleteStaffListMsg = null;
        }, 3000)
      } else {
        setTimeout(() => {
          this.DeleteStaffListMsg = null;
        }, 3000)
      }

    }, err => {
      setTimeout(() => {
        this.DeleteStaffListMsg = null;
      }, 3000)

    });
  }


  // edit staff
  Editrow = [];
  show(data, modal) {

    this.Editrow = new Array();
    this.Editrow.push(data);

    modal.show();
  }

  model = {
    "staff_id": '',
    "ol_id": '',
    
    "pass_code": '',
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
      
      "pass_code": this.Editrow[0].pass_code,
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
    
  }


  UpdateStaffListMsg: string = null;

  UpdateStaffList(formData) {
    let data = formData.value;
    this.StaffService.EditStaffList(data).subscribe(res => {
      if (res.status == 200) {
        this.UpdateStaffListMsg = res.message;
        this.StaffService.GetStaffList().subscribe(
          res => { this.StaffList = res },
          err => { console.log(err) });


        setTimeout(() => {
          this.UpdateStaffListMsg = null;
          this.largeModal1.hide();

        }, 3000);


      } else {

        setTimeout(() => {
          this.UpdateStaffListMsg = null;
          this.largeModal1.hide();

        }, 3000);
      }
    }, err => {

      setTimeout(() => {
        this.UpdateStaffListMsg = null;
        this.largeModal1.hide();

      }, 3000);

    });
  }




}
