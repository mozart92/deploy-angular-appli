import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstNaturePrelevementComponent } from './gst-nature-prelevement.component';

describe('GstNaturePrelevementComponent', () => {
  let component: GstNaturePrelevementComponent;
  let fixture: ComponentFixture<GstNaturePrelevementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstNaturePrelevementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstNaturePrelevementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
