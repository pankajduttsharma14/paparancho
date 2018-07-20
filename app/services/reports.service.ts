import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod } from '@angular/http';
import { AppSettingComponent } from '../app-setting/app-setting.component';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ReportsService {
  private headers: Headers;
  private BASE_URL: string;
  private options: RequestOptions;

  constructor(private http: Http) {
    this.BASE_URL = AppSettingComponent.API_ENDPOINT;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('client-service', 'PR2018PS');
    this.headers.append('auth-key', '5ccd7b534b19d30030c6503f3a852d00');
    // this.headers.append('enctype', 'multipart/form-data');

    this.options = new RequestOptions({ headers: this.headers });

  }


  GetReports(body): Observable < any > {

    const url: string = this.BASE_URL + "sales/report";
    return this.http.post(url, body, this.options).map(res => res.json());
  }




  // Download CSV
  download(data: any, filename: string) {
    var csvData = this.ConvertToCSV(data);
    var a: any = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;

    var isIE = /*@cc_on!@*/ false || !!( < any > document).documentMode;

    if (isIE) {
      var retVal = navigator.msSaveBlob(blob, filename + '.csv');
    } else {
      a.download = filename + '.csv';
    }
    // If you will any error in a.download then dont worry about this. 
    a.click();
  }


  // convert Json to CSV data
  ConvertToCSV(objArray: any) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //Now convert each value to string and comma-seprated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += '"' + array[i][index] + '"';
      }

      str += line + '\r\n';
    }

    return str;
  }
  
  GetMisReport(body) {
    const url: string = this.BASE_URL + "mis-report";
    return this.http.post(url, body, this.options).map(res => res.json());
  }


}
