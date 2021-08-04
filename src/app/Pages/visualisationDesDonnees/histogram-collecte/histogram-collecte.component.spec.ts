import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramCollecteComponent } from './histogram-collecte.component';

describe('HistogramCollecteComponent', () => {
  let component: HistogramCollecteComponent;
  let fixture: ComponentFixture<HistogramCollecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistogramCollecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistogramCollecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
