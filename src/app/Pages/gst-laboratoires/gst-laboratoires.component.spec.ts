import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstLaboratoiresComponent } from './gst-laboratoires.component';

describe('GstLaboratoiresComponent', () => {
  let component: GstLaboratoiresComponent;
  let fixture: ComponentFixture<GstLaboratoiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstLaboratoiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstLaboratoiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
