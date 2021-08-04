import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstAnalyseLaboratoireComponent } from './gst-analyse-laboratoire.component';

describe('GstAnalyseLaboratoireComponent', () => {
  let component: GstAnalyseLaboratoireComponent;
  let fixture: ComponentFixture<GstAnalyseLaboratoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstAnalyseLaboratoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstAnalyseLaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
