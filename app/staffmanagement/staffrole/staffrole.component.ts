import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-staffrole',
  templateUrl: './staffrole.component.html',
  styleUrls: ['./staffrole.component.scss'],
  providers: [StaffService]
})
export class StaffroleComponent implements OnInit {

  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;

  public StaffRolesList: any = {};
  StaffRoleForm: FormGroup;
  EditForm: FormGroup;
  p: number = 1;
  ol_id: string;
  title: string;
  mod_permission: string;
  status: string;

  constructor(private StaffService: StaffService,
    private router: Router, private fb: FormBuilder) {
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
    // get staff roles
    this.StaffService.GetStaffRoles().subscribe(
      res => { this.StaffRolesList = res },
      err => { console.log(err) });

    // Add Form intitilized
    this.StaffRoleForm = this.fb.group({
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(0)])],
      "title": ['', Validators.required],
      "mod_permission": ['', Validators.compose([Validators.required, Validators.min(0)])],
      "status": ['', Validators.required]


    });

    // Edit Form initilized
    this.EditForm = this.fb.group({
      'srl_id': ['', Validators.compose([Validators.required, Validators.min(0)])],
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(0)])],
      "title": ['', Validators.required],
      "mod_permission": ['', Validators.compose([Validators.required, Validators.min(0)])],
      "status": ['', Validators.required]

    });

  }

  ngOnInit() {}

  // Add Staff Role
  StaffMsg: string = null;
  AddStaffRole(formData) {
    let data = formData.value;
    formData.reset();
    this.StaffService.AddStaffRole(data).subscribe(res => {
      if (res.status == 200) {
        this.StaffMsg = res.message;
        // get staff roles
        this.StaffService.GetStaffRoles().subscribe(
          res => { this.StaffRolesList = res },
          err => { console.log(err) });

        setTimeout(() => {
          this.StaffMsg = null;
          this.largeModal.hide();

        }, 3000);

      } else {
        this.StaffMsg = "Staff Role Can't Be Added";
        setTimeout(() => {
          this.StaffMsg = null;
          this.largeModal.hide();

        }, 3000);
      }

    }, err => {

      this.StaffMsg = "Staff Role Can't Be Added";
      setTimeout(() => {
        this.StaffMsg = null;
        this.largeModal.hide();

      }, 3000);
    });
  }

  DeleteStaff: string = null;
  // Delete Staff role
  DeleteStaffRole(id) {
    this.StaffService.DeleteStaffRole(id).subscribe(res => {
      if (res.status = 200) {
        this.DeleteStaff = "Staff Role Deleted Successfully";
        // get staff roles
        this.StaffService.GetStaffRoles().subscribe(
          res => { this.StaffRolesList = res },
          err => { console.log(err) });
        setTimeout(() => {
          this.DeleteStaff = null;
        }, 3000)
      } else {
        setTimeout(() => {
          this.DeleteStaff = null;
        }, 3000)
      }

    }, err => {
      setTimeout(() => {
        this.DeleteStaff = null;
      }, 3000)

    });
  }

  // Edit Staff Role

  // Edit Category

  Editrow = [];
  show(data, modal) {

    this.Editrow = new Array();
    this.Editrow.push(data);
    modal.show();
  }

  model = {
    'srl_id': '',
    "ol_id": '',
    "title": '',
    "mod_permission": '',
    "status": ''
  }
  Edit($event = 0) {

    this.model = null;
    this.model = {
      'srl_id': this.Editrow[0].srl_id,
      "ol_id": this.Editrow[0].ol_id,
      "title": this.Editrow[0].title,
      "mod_permission": this.Editrow[0].mod_permission,
      "status": this.Editrow[0].status,

    }

  }

  UpdateStaffRoleMsg: string = null;

  UpdateStaffRole(formData) {
    let data = formData.value;
    this.StaffService.EditStaffRole(data).subscribe(res => {
      if (res.status == 200) {
        this.UpdateStaffRoleMsg = res.message;
        // get staff roles
        this.StaffService.GetStaffRoles().subscribe(
          res => { this.StaffRolesList = res },
          err => { console.log(err) });

        setTimeout(() => {
          this.UpdateStaffRoleMsg = null;
          this.largeModal1.hide();

        }, 3000);


      } else {

        setTimeout(() => {
          this.UpdateStaffRoleMsg = null;
          this.largeModal1.hide();

        }, 3000);
      }
    }, err => {

      setTimeout(() => {
        this.UpdateStaffRoleMsg = null;
        this.largeModal1.hide();

      }, 3000);

    });
  }


}
