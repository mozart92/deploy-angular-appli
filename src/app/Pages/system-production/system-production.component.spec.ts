import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemProductionComponent } from './system-production.component';

describe('SystemProductionComponent', () => {
  let component: SystemProductionComponent;
  let fixture: ComponentFixture<SystemProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
