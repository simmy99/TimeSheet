import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytimesheetComponent } from './mytimesheet.component';

describe('MytimesheetComponent', () => {
  let component: MytimesheetComponent;
  let fixture: ComponentFixture<MytimesheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MytimesheetComponent]
    });
    fixture = TestBed.createComponent(MytimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
