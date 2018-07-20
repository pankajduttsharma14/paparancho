import { Component, OnInit } from '@angular/core';
 


@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.scss']
})
export class AppSettingComponent implements OnInit {
	// QA
  // public static API_ENDPOINT="http://qa.syscraft-barpos.tk/V3/pos/";
  
  // client
  public static API_ENDPOINT="http://api.syscraft-barpos.tk/V3/pos/";
  
  constructor() { }

  ngOnInit() {


  }


 


}
