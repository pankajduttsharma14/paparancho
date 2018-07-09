import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { PriceDashboardService } from '../services/pricedashboard.service';
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-pricedashboard',
  templateUrl: './pricedashboard.component.html',
  styleUrls: ['./pricedashboard.component.scss'],
  providers: [PriceDashboardService],


})
export class PricedashboardComponent implements OnInit, AfterViewChecked {
  @ViewChild('Price_list_box') el: ElementRef;

  ItemsList: any = [];

  constructor(private PriceService: PriceDashboardService, @Inject(DOCUMENT) private document: Document) {
  }

ngOnInit() {
    // Get price list
    this.PriceService.GetPriceList().subscribe(res => {
      if (res.status == 200) {
        this.ItemsList = res.data;
        setTimeout(() => {


        }, 3000);
      } else {
        return;
      }
    }, err => {

      return;

    });

    // create css



  }
  AnimationState: boolean = false;
  heightVar: any = 0;
  stylesAppend: string;
  ngAfterViewChecked() {
    this.AnimationState = true;
    if (this.el.nativeElement.offsetHeight != 0) {
      this.heightVar =this.el.nativeElement.offsetHeight;
      

const css=".marquee{transform:translateY(0px);position: absolute;animation:marquee 350s ease infinite;}@keyframes marquee {0%{transform:translateY(0px)}50%{transform:translateY(-"+(this.heightVar)/2+"px)}100%{transform:translateY(-"+(this.heightVar)+"px)}}";
const head = document.getElementsByTagName('head')[0];
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(css));
head.appendChild(style);

    }

}










}
