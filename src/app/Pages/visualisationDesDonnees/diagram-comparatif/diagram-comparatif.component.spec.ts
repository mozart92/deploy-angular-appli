import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramComparatifComponent } from './diagram-comparatif.component';

describe('DiagramComparatifComponent', () => {
  let component: DiagramComparatifComponent;
  let fixture: ComponentFixture<DiagramComparatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramComparatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramComparatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
