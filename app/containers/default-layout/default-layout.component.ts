import { Component, Input, ViewChild } from '@angular/core';
import { navItems } from './../../_nav';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',


})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  ChangePasswordForm: FormGroup;
  @ViewChild('largeModal') public largeModal: ModalDirective;
  constructor(private router: Router, private AuthService: AuthService, private fb: FormBuilder) {


    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe( < Element > this.element, {
      attributes: true
    });
    this.CreateChangeForm();
  }

  logout(): any {
    this.AuthService.logOut();

  }

  PassMsg: boolean = null;
  UpdatePassword(formData) {

    this.AuthService.UpdatePassword(formData.value).subscribe(res => {
      if (res.status == 200) {
        this.PassMsg = true;
        setTimeout(() => {
          this.PassMsg = null;
          this.largeModal.hide();

        }, 3000);
      } else {
        this.PassMsg = false;

        setTimeout(() => {
          this.PassMsg = null;
          this.largeModal.hide();

        }, 3000);
      }

    }, err => {
      this.PassMsg = false;
      setTimeout(() => {
        this.PassMsg = null;
        this.largeModal.hide();

      }, 3000);

    });
  }

  // create Change Form
  CreateChangeForm() {
    this.ChangePasswordForm = this.fb.group({
      'user_id': [''],
      'old_password': ['', Validators.compose([Validators.required, Validators.minLength(6),this.PasswordMatch])],
      'new_password': ['', Validators.compose([Validators.required, Validators.minLength(6),this.PasswordMatch])]

    },{
      validator: this.PasswordMatch // your validation method
    });
  }

  uid: string | any;
  // show large model
  ShowLargeModel() {
    this.CreateChangeForm();
    this.uid = localStorage.getItem('userData');
    this.largeModal.show();



  }
  // password match validator
  PasswordMatch: any = (c: FormControl) => {

    if (c.get('old_password') != null || c.get('new_password') != null) {
      
      let oldpass = c.get('old_password').value;

      let newpass = c.get('new_password').value;

      if (oldpass == newpass) {

        c.get('new_password').setErrors({ PasswordMatch: true });

      } else {
        return null;
      }
    } 
    else {
      return null;
    }
  }
  
  
  




}
