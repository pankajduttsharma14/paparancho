import { Component, OnInit } from '@angular/core';
import {TableService} from '../../services/table.service';

@Component({
  selector: 'app-tabledetail',
  templateUrl: './tabledetail.component.html',
  styleUrls: ['./tabledetail.component.scss'],
  providers:[TableService]
})
export class TabledetailComponent implements OnInit {

  constructor(private TableService:TableService) { 

      // this.TableService.GetAllTable();
  }

  ngOnInit() {
  }

}
