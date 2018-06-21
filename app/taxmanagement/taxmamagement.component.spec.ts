import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxmamagementComponent } from './taxmamagement.component';

describe('TaxmamagementComponent', () => {
  let component: TaxmamagementComponent;
  let fixture: ComponentFixture<TaxmamagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxmamagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxmamagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
