import { Component, OnInit,ViewChild } from '@angular/core';
import { OutletService } from '../../services/outlet.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {Observable} from 'rxjs/Rx';
import {} from 'google-maps'; 



declare const google: any;

@Component({
  selector: 'app-viewoutlets',
  templateUrl: './viewoutlets.component.html',
  styleUrls: ['./viewoutlets.component.scss'],
  
  providers: [OutletService],

})

export class ViewoutletsComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  searchCat: any;
  OutletList: any = [];
  ErrorMsg: boolean = false;
  AddForm:FormGroup;
  constructor(private OutletService: OutletService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private fb:FormBuilder
  ) {
    var status = localStorage.getItem('loginStatus');
    if (status != "true") {
      this.router.navigate(['login']);
    }
    this.GetAllOutlets();
    this.CreateAddForm();
    
}
 // get all outlet list	
  GetAllOutlets()
  {
  	 this.OutletService.GetOutletProfile().subscribe(res => {
      this.spinnerService.show();
      if (res.status == 200) {
       	let data=JSON.parse(res._body);
       	this.OutletList=data.data;
        this.spinnerService.hide();

      } else {
        this.ErrorMsg = true;
        this.spinnerService.hide();
      }
    }, err => {
      this.ErrorMsg = true;
      this.spinnerService.hide();
    });
  }

  CreateAddForm()
  {
  	this.AddForm=this.fb.group({
		'ol_name':['',Validators.compose([Validators.required])],
		'ol_address':['',Validators.compose([Validators.required])],
		'ol_lat':['',Validators.compose([Validators.required])],
		'ol_long':['',Validators.compose([Validators.required])],
		'email_id':['',Validators.compose([Validators.required])],
		'open_time':['',Validators.compose([Validators.required])],
		'close_time':['',Validators.compose([Validators.required])],
		'status':['',Validators.compose([Validators.required])],


  	});
  }

  ShowModelAdd()
  {
  	this.CreateAddForm();
  	this.largeModal.show();
  }


Latln={};
GetLocation(event)
{
	this.Latln=null;
	let address=event.target.value;
	this.OutletService.GetLocation(address).subscribe(res=>{this.Latln=res.results[0].geometry.location;},err=>{
		this.Latln="Google api is not working";
	});

	return this.Latln;
}
  ngOnInit() {}

AddOutlet(){
	let formData={
		'ol_name':this.AddForm.controls['ol_name'].value,
		'ol_address':this.AddForm.controls['ol_address'].value,
		'ol_lat':this.AddForm.controls['ol_lat'].value,
		'ol_long':this.AddForm.controls['ol_long'].value,
		'email_id':this.AddForm.controls['email_id'].value,
		'open_time':this.AddForm.controls['open_time'].value,
		'close_time':this.AddForm.controls['close_time'].value,
		'status':this.AddForm.controls['status'].value,
	};

	this.OutletService.AddOutlet(formData).subscribe(res=>{console.log(res)});

}


}
