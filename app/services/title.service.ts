import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod} from '@angular/http';
import {AppSettingComponent} from '../app-setting/app-setting.component';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Injectable()

export class TitleService{
	constructor()
	{
		setTitle(newTitle: string) 
		{ getDOM().setTitle(newTitle); }
	}
}