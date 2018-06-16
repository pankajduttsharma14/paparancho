import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-staffmanagement',
  templateUrl: './staffmanagement.component.html',
  styleUrls: ['./staffmanagement.component.scss']
})
export class StaffmanagementComponent implements OnInit {

  constructor(private router:Router) { 

  	// this.router.navigate(['dashboard/staff-management/staffrole']);
  }

  ngOnInit() {
  }

}
