import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedtimesheetComponent } from './submittedtimesheet.component';

describe('SubmittedtimesheetComponent', () => {
  let component: SubmittedtimesheetComponent;
  let fixture: ComponentFixture<SubmittedtimesheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmittedtimesheetComponent]
    });
    fixture = TestBed.createComponent(SubmittedtimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
