import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffroleComponent } from './staffrole.component';

describe('StaffroleComponent', () => {
  let component: StaffroleComponent;
  let fixture: ComponentFixture<StaffroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
