import { NgModule } from '@angular/core';
import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import 'rxjs/add/operator/map';
import {FoodService} from '../../services/food.service';
// local Storage

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls:['login.component.css'],
  providers:[AuthService,FoodService]
})

export class LoginComponent{


	myfrm={uid1:'',pas1:''}

	loginError:boolean=false;
// constructor
constructor(private auth: AuthService, private router:Router, private FoodService:FoodService){

	
	var status=localStorage.getItem('loginStatus');


	if(status==="true")
	{
		this.router.navigate(['dashboard']);
	}
	else{
		this.router.navigate(['login']);
	}
}

 // Asign Categories and brands to local Storage
  SetCatData()
  {
    var categories=[];

    this.FoodService.GetAllCategories().subscribe(res=>{
      	for(var i=0; i<res.data.length;i++)
      	{
     		categories.push({catId:res.data[i].icid,catName:res.data[i].cat_title});

      	}

      	localStorage.setItem('categories',JSON.stringify(categories));

      },
    err=>{
      console.log(err);
    });
  }
// set brand data
  SetBrandData()
  {
    var brands=[];

    this.FoodService.GetAllBrands().subscribe(res=>{

    	for(var i=0; i<res.data.length;i++)
      	{
     		brands.push({brId:res.data[i].brid,brName:res.data[i].brand_title});

      	}

      	localStorage.setItem('brands',JSON.stringify(brands));

      },
    err=>{
      console.log(err);
    });
  }
	LoginLoader:boolean;
	// login auth function
LoginAuth(userData):any
	{
		this.loginError=false;
		let body = userData;
		this.auth.loginAuthService(body).subscribe(
		res=>{
         		if(res.status==200)
         		{
						 this.LoginLoader=true;
						 localStorage.setItem('userData',res.user_id);
						 localStorage.setItem('loginStatus',"true");
						 this.SetCatData();
						 this.SetBrandData();

							setTimeout(()=>{
								this.LoginLoader=false;
								this.router.navigate(['dashboard']);


							},1000);



				}
         		else
         		{
							this.LoginLoader=false;
				this.loginError=true;
				localStorage.clear();
				  setTimeout(()=>{
				  	this.loginError=false;
				  },3000);
         		}
         	},
            err=>
            {
							this.LoginLoader=false;
				this.loginError=true;
				localStorage.clear();
				setTimeout(()=>{
				  	this.loginError=false;
				  },3000);


            }

		);




	}


}
