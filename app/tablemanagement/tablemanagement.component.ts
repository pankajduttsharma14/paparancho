import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tablemanagement',
  templateUrl: './tablemanagement.component.html',
  styleUrls: ['./tablemanagement.component.scss']
})
export class TablemanagementComponent implements OnInit {

  constructor(private router:Router) { 
    
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {

      this.router.navigate(['login']);

    }
    this.router.navigate(['dashboard/table-management/view-tables']);

  }

  ngOnInit() {
  }

}
