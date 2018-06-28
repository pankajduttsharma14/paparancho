import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewoutletsComponent } from './viewoutlets.component';

describe('ViewoutletsComponent', () => {
  let component: ViewoutletsComponent;
  let fixture: ComponentFixture<ViewoutletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewoutletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewoutletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
