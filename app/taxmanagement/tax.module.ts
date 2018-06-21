import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TaxmamagementComponent } from './taxmamagement.component';
import { ViewtaxComponent } from './viewtax/viewtax.component';
import {TaxRoutingModule} from './tax.routing';

@NgModule({
imports:[CommonModule,NgxPaginationModule,ModalModule.forRoot(),FormsModule, ReactiveFormsModule,Ng4LoadingSpinnerModule,
Ng2SearchPipeModule,TaxRoutingModule],
declarations:[TaxmamagementComponent,ViewtaxComponent],


})

export class TaxModule{}