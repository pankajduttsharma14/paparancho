import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablemanagementComponent } from './tablemanagement.component';

describe('TablemanagementComponent', () => {
  let component: TablemanagementComponent;
  let fixture: ComponentFixture<TablemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
