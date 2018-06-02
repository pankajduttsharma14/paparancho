import { Component, OnInit } from '@angular/core';
import {TableService} from '../../services/table.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-tables',
  templateUrl: './view-tables.component.html',
  styleUrls: ['./view-tables.component.scss'],
  providers:[TableService]
})
export class ViewTablesComponent implements OnInit {

  constructor(private TableService:TableService, private router:Router) { 

    var status=localStorage.getItem('loginStatus');
  	if(status!="true")
  	{
  		this.router.navigate(['login']);
  	}
  }
  GetTables=[];
  GetTablesMsg;
  ngOnInit() {
      this.TableService.GetAllTable().subscribe(res=>{
        if(res.status==200)
        {
          this.GetTables=res.data;
        }
        else{
          this.GetTablesMsg="No Tables For Display";
        }
    },
    err=>{
      this.GetTablesMsg="No Tables For Display";
    });
  }

TableDetail=[];
  TableDetails(TableData)
  {   this.TableDetail=[];
      if(TableData.is_available=="FREE")
      { 
        this.TableDetail.push(TableData);
      }
      else{
        this.TableDetail=null;  
      }
  }
}
