import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewoutletsComponent } from './viewoutlets/viewoutlets.component';
import { OutletmanagementComponent} from './outletmanagement.component';
import {OutletRoutingModule} from './outlet.routing';
import { AgmCoreModule } from '@agm/core';

@NgModule({
imports:[CommonModule,NgxPaginationModule,ModalModule,ReactiveFormsModule,Ng4LoadingSpinnerModule,Ng2SearchPipeModule,OutletRoutingModule,FormsModule,
	AgmCoreModule.forRoot({
      apiKey: "AIzaSyBTjAZKYtZiS7KHMJwDw53-t2QITTsugGU",
      libraries: ["IN"]
    }),
],
declarations:[ViewoutletsComponent,OutletmanagementComponent],

})

export class OutletModule{}