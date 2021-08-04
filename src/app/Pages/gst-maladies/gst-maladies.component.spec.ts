import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstMaladiesComponent } from './gst-maladies.component';

describe('GstMaladiesComponent', () => {
  let component: GstMaladiesComponent;
  let fixture: ComponentFixture<GstMaladiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstMaladiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstMaladiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
