import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LasttimesheetComponent } from './lasttimesheet.component';

describe('LasttimesheetComponent', () => {
  let component: LasttimesheetComponent;
  let fixture: ComponentFixture<LasttimesheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LasttimesheetComponent]
    });
    fixture = TestBed.createComponent(LasttimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
