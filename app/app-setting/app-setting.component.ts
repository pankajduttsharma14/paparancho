import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.scss']
})
export class AppSettingComponent implements OnInit {
  public static API_ENDPOINT="http://qa.syscraft-barpos.tk/V3/index.php/pos/";
  constructor() { }

  ngOnInit() {


  }

}
