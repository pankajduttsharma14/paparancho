import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpModule } from '@angular/http';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { StorageServiceModule } from 'angular-webstorage-service';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderModule} from './order/order.module';
import {VouchersModule} from './vouchers/vouchers.module';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from './views/notifications/modals.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';



const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,


} from '@coreui/angular'

// Import routing module
import { AppRoutingModule } from './app.routing';
import { RouterModule, Routes, Router } from '@angular/router';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AppSettingComponent } from './app-setting/app-setting.component';
import {FoodModule} from './food/food.module';
import {StaffManagementModule} from './staffmanagement/staffmanagement.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from './tablemanagement/table.module';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';







@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    FormsModule,
    StorageServiceModule,
    FoodModule,
    StaffManagementModule,
    NgxPaginationModule,
    OrderModule,
    VouchersModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TableModule,
    Ng4LoadingSpinnerModule.forRoot()




  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    AppSettingComponent,
    ModalsComponent,






  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy,},AuthService,Ng4LoadingSpinnerService],
    exports:[ModalsComponent,ModalModule],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
