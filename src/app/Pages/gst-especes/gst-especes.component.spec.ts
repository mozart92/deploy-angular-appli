import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstEspecesComponent } from './gst-especes.component';

describe('GstEspecesComponent', () => {
  let component: GstEspecesComponent;
  let fixture: ComponentFixture<GstEspecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstEspecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstEspecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
