import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstPathologiesComponent } from './gst-pathologies.component';

describe('GstPathologiesComponent', () => {
  let component: GstPathologiesComponent;
  let fixture: ComponentFixture<GstPathologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstPathologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstPathologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
