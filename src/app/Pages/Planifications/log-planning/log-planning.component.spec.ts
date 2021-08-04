import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogPlanningComponent } from './log-planning.component';

describe('LogPlanningComponent', () => {
  let component: LogPlanningComponent;
  let fixture: ComponentFixture<LogPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
