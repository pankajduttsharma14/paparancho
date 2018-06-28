import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-staffrole',
  templateUrl: './staffrole.component.html',
  styleUrls: ['./staffrole.component.scss'],
  providers: [StaffService,Ng4LoadingSpinnerService]
})
export class StaffroleComponent implements OnInit {

  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('largeModal1') public largeModal1: ModalDirective;
  @ViewChild('dangerModal') public dangerModel: ModalDirective;

  public StaffRolesList: any = {};
  StaffRoleForm: FormGroup;
  EditForm: FormGroup;
  p: number = 1;
  ol_id: string;
  title: string;
  mod_permission: string;
  status: string;

  constructor(private StaffService: StaffService,
    private router: Router, private fb: FormBuilder,private spinnerService: Ng4LoadingSpinnerService) {
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
    // get staff roles
    this.spinnerService.show();
    this.StaffService.GetStaffRoles().subscribe(
      res => { this.StaffRolesList = res;this.spinnerService.hide(); },
      err => { this.spinnerService.hide();});

    

  }


  ngOnInit() {
    this.CreateAddForm();
    this.CreateEditForm();
  }

  
  CreateAddForm()
  {
    // Add Form intitilized
    this.StaffRoleForm = this.fb.group({
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(0)])],
      "title": ['', Validators.required],
      "mod_permission": [''],
      // "mod_permission": ['', Validators.compose([Validators.required, Validators.min(0)])],
      "status": ['', Validators.required]


    });
  }

  CreateEditForm(){
    // Edit Form initilized
    this.EditForm = this.fb.group({
      'srl_id': ['', Validators.compose([Validators.required, Validators.min(0)])],
      "ol_id": ['', Validators.compose([Validators.required, Validators.min(0)])],
      "title": ['', Validators.required],
      // "mod_permission": ['', Validators.compose([Validators.required, Validators.min(0)])],
      "mod_permission": [''],
      "status": ['', Validators.required]

    });
  }

  // Add Staff Role
  StaffMsg: string = null;
  AddStaffRole(formData) {
    this.spinnerService.show();
    let data = formData.value;
    this.CreateAddForm();

    this.StaffService.AddStaffRole(data).subscribe(res => {
      if (res.status == 200) {
        this.StaffMsg = res.message;
        this.spinnerService.hide();
        // get staff roles
        this.StaffService.GetStaffRoles().subscribe(
          res => { this.StaffRolesList = res;this.spinnerService.hide(); },
          err => { this.spinnerService.hide(); });

        setTimeout(() => {
          this.StaffMsg = null;
          this.largeModal.hide();

        }, 3000);

      } else {
        this.StaffMsg = "Staff Role Can't Be Added";
        this.spinnerService.hide();
        setTimeout(() => {
          this.StaffMsg = null;
          this.largeModal.hide();

        }, 3000);
      }

    }, err => {

      this.StaffMsg = "Staff Role Can't Be Added";
      this.spinnerService.hide();
      setTimeout(() => {
        this.StaffMsg = null;
        this.largeModal.hide();

      }, 3000);
    });
  }

  DeleteStaff: string = null;
  // Delete Staff role
roleId:any;
  // Delete Staff
  ConfirmDialog(id, trigger:boolean=false)
  {
    this.roleId=id;
    if(trigger==true)
    {
      
      this.DeleteStaffRole(this.roleId);  
      this.dangerModel.hide();

    }
    else{this.dangerModel.show();}
    
  }



  DeleteStaffRole(id) {
    this.spinnerService.show();
    this.StaffService.DeleteStaffRole(id).subscribe(res => {
      if (res.status = 200) {
        this.DeleteStaff = "Staff Role Deleted Successfully";
        // get staff roles
        this.StaffService.GetStaffRoles().subscribe(
          res => { this.StaffRolesList = res;this.spinnerService.hide(); },
          err => { this.spinnerService.hide(); });
        setTimeout(() => {
          this.DeleteStaff = null;
        }, 3000)
      } else {
        this.spinnerService.hide();
        setTimeout(() => {
          this.DeleteStaff = null;
        }, 3000)
      }

    }, err => {
      this.spinnerService.hide();
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
    this.spinnerService.show();
    let data = formData.value;
    this.StaffService.EditStaffRole(data).subscribe(res => {
      if (res.status == 200) {
        this.UpdateStaffRoleMsg = res.message;
        // get staff roles
        this.StaffService.GetStaffRoles().subscribe(
          res => { this.StaffRolesList = res;this.spinnerService.hide(); },
          err => { this.spinnerService.hide();});

        setTimeout(() => {
          this.UpdateStaffRoleMsg = null;
          this.largeModal1.hide();

        }, 3000);


      } else {
        this.spinnerService.hide();

        setTimeout(() => {
          this.UpdateStaffRoleMsg = null;
          this.largeModal1.hide();

        }, 3000);
      }
    }, err => {
      this.spinnerService.hide();
      setTimeout(() => {
        this.UpdateStaffRoleMsg = null;
        this.largeModal1.hide();

      }, 3000);

    });
  }

showModel(model)
{
  this.CreateAddForm();
  model.show();  
}


}

