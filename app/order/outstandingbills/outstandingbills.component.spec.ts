import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingbillsComponent } from './outstandingbills.component';

describe('OutstandingbillsComponent', () => {
  let component: OutstandingbillsComponent;
  let fixture: ComponentFixture<OutstandingbillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingbillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingbillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
