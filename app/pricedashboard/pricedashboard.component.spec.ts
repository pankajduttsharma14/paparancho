import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricedashboardComponent } from './pricedashboard.component';

describe('PricedashboardComponent', () => {
  let component: PricedashboardComponent;
  let fixture: ComponentFixture<PricedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
