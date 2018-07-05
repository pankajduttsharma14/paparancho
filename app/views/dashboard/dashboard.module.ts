import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';  
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    Ng4LoadingSpinnerModule,
    NgxPaginationModule
    
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
